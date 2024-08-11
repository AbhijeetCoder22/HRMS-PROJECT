import login_encrypt as lg_enc
import db_cred as db
import datetime

DB_Connection = db.MydbCred()


def login_user(data):
    if data['usrnm'] and data['pswd']:
        stored_pasword = DB_Connection.select_execution("SELECT Password,Personid,FullName FROM users WHERE User_name = %s",(data['usrnm'],))
        if stored_pasword:
            isexisting = DB_Connection.select_execution("SELECT Isexisting FROM Existing_Empolyee WHERE Personid=%s",(stored_pasword[0][1],))
            if isexisting[0][0] == 'YES':
                stored_role = DB_Connection.select_execution("SELECT Role_id FROM user_2_role_tbl WHERE Personid = %s",(stored_pasword[0][1],))
                salt = lg_enc.generate_salt_password()
                encode_ui_pswd = lg_enc.encode_password(data['pswd'])
                hash_stored_pswd = lg_enc.hashing_pswd(stored_pasword[0][0],salt)
                hash_ui_pswd = lg_enc.hashing_pswd(encode_ui_pswd,salt)
                isMatched = lg_enc.compare_pswd(hash_stored_pswd,hash_ui_pswd)
                if isMatched:
                    now = datetime.datetime.now()
                    DB_Connection.insert_execution("INSERT INTO audit_tbl (Personid,FullName,Login_datetime) VALUES(%s,%s,%s)",(stored_pasword[0][1],stored_pasword[0][2],now))
                    return ['true',stored_pasword[0][2],stored_role[0][0],stored_pasword[0][1]]
                else:
                    return 'INCORRECT PASSWORD !!!'
            else:
                return 'USER IS NO MORE AN EMPLOYEE!!!'
        else:
            return 'EMPLOYEE DOESTNOT EXIST !!!'
    else:
        return 'USERNAME AND PASSWORD CANNOT BE EMPTY !!!'
    

def update_password(data):
    if data['empId'] and data['nwpswd'] and data['cnfpswd']:
        stored_emp_id = DB_Connection.select_execution("SELECT employee_id FROM users WHERE User_name = %s",(data['usrnme'],))
        if stored_emp_id[0][0] == data['empId']:
            if data['nwpswd'] == data['cnfpswd']:
                encryptpswd = lg_enc.encode_password(data['nwpswd'])
                ispswdupdated = DB_Connection.update_executaion("UPDATE users SET Password = %s WHERE User_name = %s and employee_id = %s",(encryptpswd,data['usrnme'],data['empId']))
                if ispswdupdated:
                    return ['true','PASSWORD UPATED!!!']
                else:
                    return 'SOMETHING WENT WRONG PLEASE TRY AFTER SOMETIME WITH DIFFERRENT PASSWORD!!!'
            else:
                return 'NEW PASSWORD AND CONFIRM PASSWORD DOESNOT MATCH !!!'
        else:
            return 'EMPLOYEE ID DOESNT MATCH !!!'
    else:
        return ('ALL FIELDS ARE MANDETORY !!!')
