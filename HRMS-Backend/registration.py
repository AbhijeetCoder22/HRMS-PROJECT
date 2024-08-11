import login_encrypt as lg_enc
import db_cred as db

DB_Connection = db.MydbCred()

def register_user(data):
    get_dict_data = data[0]
    if get_dict_data['fullname'] and get_dict_data['jningdt'] and get_dict_data['mailid'] and get_dict_data['mobilenumber'] and get_dict_data['employeeid'] and get_dict_data['usrnme'] and get_dict_data['pswd'] and get_dict_data['position'] and get_dict_data['role']:
        if get_dict_data['pswd'] == get_dict_data['cnfpswd']:
            is_user_exist = DB_Connection.select_execution("SELECT password FROM users WHERE User_name = %s",(get_dict_data['usrnme'],))
            if is_user_exist:
                return 'USERNAME EXIST  !!!'
            else:
                get_encoded_pswd = lg_enc.encode_password(get_dict_data['pswd'])
                query = "INSERT INTO users (FullName,joiningdate,Mailid,Mobile_Number,employee_id,User_name,Password,position) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
                param = (get_dict_data['fullname'],get_dict_data['jningdt'],get_dict_data['mailid'],get_dict_data['mobilenumber'],get_dict_data['employeeid'],get_dict_data['usrnme'],get_encoded_pswd,get_dict_data['position'])
                is_Added = DB_Connection.insert_execution(query,param)
                if is_Added:
                    get_user_id = DB_Connection.select_execution("SELECT Personid FROM users WHERE User_name = %s",(get_dict_data['usrnme'],))
                    is_role_Added = DB_Connection.insert_execution("INSERT INTO user_2_role_tbl (Personid,Role_id) VALUES (%s,%s)",(get_user_id[0][0],get_dict_data['role']))
                    Add_existing_employee = DB_Connection.insert_execution("INSERT INTO Existing_Empolyee(Personid) VALUES(%s);",(get_user_id[0][0],))
                    if is_role_Added and Add_existing_employee:
                        return "EMPLOYEE ADDED !!!"
                    else:
                        DB_Connection.delete_executaion("DELETE FROM users WHERE Personid=%s",(get_user_id[0][0],))
                        return "SOMETHING WENT WRONG !!!"
                else:
                    return "SOMETHING WENT WRONG TRY AFTER SOMETIME !!!"
        else:
            return "CONFIRM PASSWORD AND PASSWORD DOESNOT MATCH !!!"
    else:
        return "ALL FIELDS ARE MANDETORY !!!"