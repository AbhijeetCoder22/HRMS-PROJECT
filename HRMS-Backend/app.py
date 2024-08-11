from flask import Flask, jsonify, request, send_file
from flask_cors  import CORS
import db_cred as db
import registration as registration
import user_login as user_login
import holiday as holiday
import valuevalidation as validation
import employeemanagement as empmag
from docx import Document
import pandas as pd
import datetime
import errormsg


DB_Connection = db.MydbCred()

app = Flask(__name__)
CORS(app)


@app.route("/")
def server():
    return "<h1>Server Started</h1>"


@app.route("/superadmin",methods=['GET'])
def superadmin():
    isSuperadminexist = DB_Connection.select_execution("SELECT User_2_role_id FROM user_2_role_tbl where Role_id=%s",(-1,))
    if isSuperadminexist:
        return jsonify('true')
    else:
        return jsonify('false')
    

@app.route("/login",methods=['POST'])
def login():
    data = request.get_json()
    result = user_login.login_user(data)
    return jsonify(result)


@app.route("/register",methods=['POST'])
def register():
    data = request.get_json()
    result = registration.register_user(data)
    return jsonify(result)
    
   
@app.route("/userexist",methods=['POST'])
def userexist():
    data = request.get_json()
    if data['usrnme']:
        is_user_exist = DB_Connection.select_execution("SELECT password FROM users WHERE User_name = %s",(data['usrnme'],))
        if is_user_exist:
            return jsonify('true')
        else:
            return jsonify('EMPLOYEE DOESNT EXIST !!!')
    else:
        return jsonify('PLEASE ENTER USERNAME !!!')
    

@app.route("/updatepswd",methods=['POST'])
def updatepswd():
    data = request.get_json()
    result = user_login.update_password(data)
    return jsonify(result)
    

@app.route("/addholiday",methods=['POST'])
def addholiday():
    data = request.get_json()
    result = holiday.add_holiday(data)
    return jsonify(result)


@app.route('/showholiday',methods=['GET'])
def showholiday():
    holiday = DB_Connection.select_execution("SELECT * FROM holiday_list_tbl WHERE YEAR(date) = YEAR(CURDATE())")
    if holiday:
        return jsonify(holiday)
    else:
        return jsonify("NO HOLIDAYS OF THIS YEAR IS PRESENT !!!")
    
    
@app.route("/deleteholiday",methods=['POST'])
def deleteholiday():
    data = request.get_json()
    isDeleted = DB_Connection.delete_executaion("DELETE FROM holiday_list_tbl WHERE id = %s",(data['id'],))
    if isDeleted:
        return jsonify("DELETED !!!")
    else:
        return jsonify("NO HOLIDAYS OF THIS YEAR IS PRESENT !!!")
    

@app.route("/getemp",methods=['GET'])
def getemp():
    Emps = DB_Connection.select_execution("SELECT usr.Personid,usr.FullName,usr.Mailid,usr.employee_id,usr.position,usr.joiningdate,ext_emp.Isexisting,usr.User_name,usr.Mobile_Number FROM users usr inner join Existing_Empolyee ext_emp on usr.Personid=ext_emp.Personid;")
    if Emps:
        return jsonify(Emps)
    else:
        return jsonify("NO EMPOLYEES HAS BEEN ADDED YET!!")


@app.route("/getempdtls",methods=['GET'])
def getempdtls():
    Empsdt = DB_Connection.select_execution("SELECT Persionid,AadharCardNo,PANCardNo,Address,FatherName,MotherName,SpouceName,Martricpercent,SchoolName,twelvethpercent,Collegename,graduationmark,graduationcollege FROM Employee_details")
    if Empsdt:
        return jsonify(Empsdt)
    else:
        return jsonify('false')
    
    
@app.route("/updateempsdtls",methods=['POST'])
def updateempsdtls():
    data = request.get_json()
    first_part = data[0]['fstprt'][0]
    second_part = data[0]['scdprt'][0]
    emp_id = data[0]['empid']
    is_first_part_field_not_null = True
    is_second_part_field_not_null = True
    for key in first_part:
        if not first_part[key]:
            is_first_part_field_not_null = False
            break
    for key in second_part:
        if not second_part[key]:
            is_second_part_field_not_null = False
            break
    if is_first_part_field_not_null and is_second_part_field_not_null:
        is_aadhar = validation.validate_aadhar_no(second_part['aadhar'])
        is_pancard = validation.validate_pan_no(second_part['pncrd'])
        if is_aadhar and is_pancard:
            get_emp_dtls = DB_Connection.select_execution("SELECT * FROM users WHERE Personid=%s",(emp_id,))
            get_cols = empmag.get_list_of_col_for_update(get_emp_dtls,first_part,1)
            updated_first = False
            if get_cols[0]:
                query = "UPDATE users SET " + get_cols[0] + " WHERE Personid=%s"
                get_cols[1].append(emp_id)
                updated_first = DB_Connection.update_executaion(query,get_cols[1])
            else:
                updated_first = True
            does_exist = DB_Connection.select_execution("SELECT * FROM Employee_details WHERE Persionid=%s",(emp_id,))
            if does_exist:
                get_second_cols = empmag.get_list_of_col_for_update(does_exist,second_part)
                get_second_cols[1].append(emp_id)
                if get_second_cols[0]:
                    query = "UPDATE Employee_details SET " + get_second_cols[0] + " WHERE Persionid=%s"
                    updated_second = DB_Connection.update_executaion(query,get_second_cols[1])
                else:
                    updated_second = True  
            else:
                updated_second = DB_Connection.insert_execution("INSERT INTO Employee_details(Persionid,AadharCardNo,PANCardNo,Address,FatherName,MotherName,SpouceName,Martricpercent,SchoolName,twelvethpercent,Collegename,graduationmark,graduationcollege) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(emp_id,second_part['aadhar'],second_part['pncrd'],second_part['addrs'],second_part['fthrnme'],second_part['mthrnme'],second_part['spnme'],second_part['tnthmrk'],second_part['tnthscl'],second_part['twthmrk'],second_part['twthclg'],second_part['gradmrk'],second_part['gradclg']))
            if updated_first and updated_second:
                return jsonify('UPDATED !!!')
            else:
                return jsonify('SOMETHING WENT WRONG !!!')
        else:
            return jsonify('PANCARD OR AADHAR CARD IS NOT CORRECT !!!')
    else:
        print(data)
        return jsonify('ALL FIELDS ARE MANDETORY !!! **NA IF NOT APPLICABLE')
    
    
@app.route("/lockunlockuser",methods=['POST'])
def lockunloackuser():
    data = request.get_json()
    value = ''
    if str(data['tempid']) == str(data['empid']):
        return jsonify("YOU CAN'T LOCK YOUR OWN ACCOUNT !!!")
    else:
        if data['empexist'] == 'YES':
            value = 'NO'
        else:
            value = 'YES'
        
        if value:
            isupdated = DB_Connection.update_executaion("UPDATE Existing_Empolyee SET Isexisting = %s WHERE Personid=%s",(value,data['empid']))
            if isupdated:
                return jsonify('true')
            else:
                return jsonify('SOMETHING WENT WRONG TRY AFTER SOME TIME !!!')
        else:
            return jsonify('VALUE IS NULL !!!')
    

@app.route("/downloadinfo",methods=['POST'])
def downloadinfo():
    data = request.get_json()
    results = DB_Connection.select_execution_cursor("select usr.FullName,usr.Mailid,usr.Mobile_number,usr.employee_id,usr.joiningdate,emp_dtls.AadharCardNo,emp_dtls.PANCardNo,emp_dtls.Address,emp_dtls.FatherName,emp_dtls.MotherName,emp_dtls.SpouceName,emp_dtls.Martricpercent,emp_dtls.SchoolName,emp_dtls.twelvethpercent,emp_dtls.Collegename,emp_dtls.graduationmark,emp_dtls.graduationcollege from (select FullName,Mailid,Mobile_Number,employee_id,joiningdate,personid from users where personid = %s) usr inner join Employee_details as emp_dtls on usr.Personid = emp_dtls.Persionid;",(data['empid'],))
    doc = Document()
    file_name = results[0][0][0].split()[0] + '_Candidate_info.docx'
    df = pd.DataFrame(results[0], columns=[desc[0] for desc in results[1].description])
    df = df.transpose()
    table = doc.add_table(rows=0, cols=2)
    table.style = 'Table Grid'
    for row in df.iterrows():
        row_cells = table.add_row().cells
        row_cells[0].text = str(row[0]) 
        row_cells[1].text = str(row[1][0])
        doc.save(file_name)
    return send_file(file_name, as_attachment=True)


@app.route("/submitattendance",methods=['POST'])
def submitattendance():
    data = request.get_json()
    now = datetime.datetime.now()
    todays_date = datetime.date.today()
    today_attendance = DB_Connection.select_execution("SELECT personid FROM Attendance_register WHERE DATE(attendance_date) = %s AND personid=%s" ,(todays_date,data['empid']))
    if today_attendance:
        return jsonify(errormsg.already_exist)
    else:
        query = "INSERT INTO Attendance_register(personid,attendance_date,place_of_work,type) VALUES (%s,%s,%s,%s)"
        param = (data['empid'],now,data['get_place'],data['get_place'][0])
        isadded = DB_Connection.insert_execution(query,param)
        if isadded:
            return jsonify(errormsg.added_attend)
        else:
            return jsonify(errormsg.something_wrong)
    

@app.route("/getattendance",methods=['POST'])
def getattendance():
    data_dict = {}
    data = request.get_json()
    if data['empid'] and data['Month'] and data['year']:
        get_db_data = DB_Connection.select_execution("SELECT DAY(attendance_date),type FROM Attendance_register WHERE MONTH(attendance_date)=%s AND YEAR(attendance_date)=%s AND personid=%s",(data['Month'],data['year'],data['empid']))
        if get_db_data:
            for item in get_db_data:
                data_dict[item[0]] = item[1]
            return jsonify(data_dict)
        else:
            return jsonify(data_dict)
    else:
        return jsonify(errormsg.emp_id_error)
    

@app.route("/getattendtls",methods=['POST'])
def getattendtls():
    data = request.get_json()
    if data['id']:
        if data['val'] == 0:
            getpersonid = DB_Connection.select_execution("SELECT personid FROM users WHERE employee_id=%s",(data['id'],))
            get_months= DB_Connection.select_execution("SELECT DISTINCT MONTH(attendance_date) FROM Attendance_register WHERE personid=%s",(getpersonid[0][0],))
            get_year = DB_Connection.select_execution("SELECT DISTINCT YEAR(attendance_date) FROM Attendance_register WHERE personid=%s",(getpersonid[0][0],))
            get_present_count = DB_Connection.select_execution("SELECT count(attendance_date),type FROM Attendance_register WHERE personid=%s GROUP BY type",(getpersonid[0][0],))
            get_total_count = DB_Connection.select_execution("SELECT count(attendance_date) FROM Attendance_register WHERE personid=%s",(getpersonid[0][0],))
            return jsonify([get_months,get_year,get_present_count,get_total_count])
        if data['val'] == 1:
            if data['month'] != '0' and data['year'] != 0:
                if data['month'] and data['year']:
                    getpersonid = DB_Connection.select_execution("SELECT personid FROM users WHERE employee_id=%s",(data['id'],))
                    get_months= DB_Connection.select_execution("SELECT DISTINCT MONTH(attendance_date) FROM Attendance_register WHERE personid=%s",(getpersonid[0][0],))
                    get_year = DB_Connection.select_execution("SELECT DISTINCT YEAR(attendance_date) FROM Attendance_register WHERE personid=%s",(getpersonid[0][0],))
                    get_present_count = DB_Connection.select_execution("SELECT count(attendance_date),type FROM Attendance_register WHERE personid=%s AND MONTH(attendance_date) = %s and YEAR(attendance_date) =%s GROUP BY type",(getpersonid[0][0],int(data['month']),int(data['year'])))
                    get_total_count = DB_Connection.select_execution("SELECT count(attendance_date) FROM Attendance_register WHERE personid=%s AND MONTH(attendance_date) = %s and YEAR(attendance_date) =%s",(getpersonid[0][0],int(data['month']),int(data['year'])))
                    return jsonify([get_months,get_year,get_present_count,get_total_count])
                else:
                    return jsonify(errormsg.Month_year_null)
            else:
                return jsonify(errormsg.month_or_year_not_zero)
    else:
        return jsonify(errormsg.mandetory_error)
    
    
@app.route("/downloadempatten",methods=['POST'])
def downloadempatten():
    data = request.get_json()
    attendance = {}
    holidays = []
    if data['month'] and data['year']:
        getpersonid = DB_Connection.select_execution("SELECT personid FROM users WHERE employee_id=%s",(data['id'],))
        get_attendance = DB_Connection.select_execution("SELECT DATE(attendance_date),place_of_work FROM Attendance_register WHERE personid =%s AND MONTH(attendance_date) = %s and YEAR(attendance_date) =%s",(getpersonid[0][0],int(data['month']),int(data['year'])))
        if get_attendance:    
            get_no_of_days = validation.get_days_in_month(int(data['year']),int(data['month']))
            for dt in range(1,get_no_of_days+1):
                attendance[datetime.date(int(data['year']),int(data['month']),dt)] = "Leave"
            keys_list = list(attendance.keys())
            get_holiday_list = DB_Connection.select_execution("SELECT date FROM holiday_list_tbl")
            if get_holiday_list:
                for dt in get_holiday_list:
                    holidays.append(validation.date_format_covertion(dt[0]))
            for item in keys_list:
                if validation.date_format_covertion(item) in holidays or validation.is_weekend(str(validation.date_format_covertion(item))):
                    attendance[item] = "Holiday"
            for line in get_attendance:
                attendance[line[0]] = line[1]
            attendance_list = [{'date': date, 'status': status} for date, status in attendance.items()]
            df = pd.DataFrame(attendance_list)
            filename = data['id']+'_'+data['month']+'_'+data['year']+'.xlsx'
            df.to_excel(filename)
            return send_file(filename, as_attachment=True)
        else:
            return jsonify(errormsg.not_present)
    else:
        return jsonify(errormsg.Month_year_null)


@app.route("/updateattendance",methods=["POST"])
def updateattendance():
    type_to_place = {
        "C" : "Client Location",
        "O" : "Office",
        "H" : "Home"
    }
    data = request.get_json()
    todays_date = datetime.date.today()
    if data['id'] and data['upval'] and data['sledt']:
        getpersonid = DB_Connection.select_execution("SELECT personid FROM users WHERE employee_id=%s",(data['id'],))
        get_attendance = DB_Connection.select_execution("SELECT type FROM Attendance_register WHERE personid =%s AND DATE(attendance_date) = %s",(getpersonid[0][0],data['sledt']))
        if get_attendance:
            if get_attendance[0]:
                if get_attendance[0][0] != data['upval']:
                    is_updated = DB_Connection.update_executaion("UPDATE Attendance_register SET place_of_work=%s,type=%s WHERE personid=%s and DATE(attendance_date)=%s",(type_to_place[data["upval"]],data["upval"],getpersonid[0][0],data['sledt']))
                    if is_updated:
                        return jsonify(errormsg.updated)
                    else:
                        return jsonify(errormsg.something_wrong)
                else:
                    return jsonify(errormsg.same_value)
            else:
                return jsonify(errormsg.not_present)
        else:
            get_dates = datetime.datetime.strptime(data['sledt'],'%Y-%m-%d').date()
            if get_dates < todays_date:
                is_insert = DB_Connection.insert_execution("INSERT INTO Attendance_register(personid,attendance_date,place_of_work,type) VALUES (%s,%s,%s,%s)",(getpersonid[0][0],get_dates,type_to_place[data["upval"]],data["upval"]))
                if is_insert:
                    return jsonify(errormsg.updated)
                else:
                    return jsonify(errormsg.something_wrong)
            else:
                return jsonify(errormsg.ftredt)
    else:
        return jsonify(errormsg.mandetory_error)


@app.route("/leavemanagement",methods=["POST"])
def leavemanagement():
    data = request.get_json()
    if data['enddt'] and data['id'] and data['leavename'] and data['reason'] and data['strtdt'] and data['type']:
        todays_date = datetime.date.today()
        get_strtdt = datetime.datetime.strptime(data['strtdt'],'%Y-%m-%d').date()
        get_enddt = datetime.datetime.strptime(data['enddt'],'%Y-%m-%d').date()
        get_today_date = datetime.datetime.strptime(str(todays_date),'%Y-%m-%d').date()
        if get_today_date <= get_strtdt:
            if get_strtdt < get_enddt:
                get_leave_start_date = DB_Connection.select_execution("SELECT leave_from FROM Leave_management WHERE personid=%s",(int(data['id']),))
                get_leave_joining_date = DB_Connection.select_execution("SELECT leave_to FROM Leave_management WHERE personid=%s",(int(data['id']),))
                if get_leave_start_date and get_leave_joining_date:
                    getlvstdt = []
                    getlnjndt = []
                    for i in get_leave_start_date:
                        getlvstdt.append(validation.date_format_covertion(i[0]))
                    for i in get_leave_joining_date:
                        getlnjndt.append(validation.date_format_covertion(i[0]))
                    if get_strtdt not in getlvstdt and get_enddt not in getlnjndt:
                        isInserted = DB_Connection.insert_execution("INSERT INTO Leave_management(personid,Leave_name,leave_reason,type,leave_from,leave_to,status) VALUES(%s,%s,%s,%s,%s,%s,%s)",(int(data['id']),data['leavename'],data['reason'],data['type'],get_strtdt,get_enddt,"PENDING"))
                        if isInserted:
                            return jsonify(errormsg.leave_apply)
                        else:
                            return jsonify(errormsg.something_wrong)
                    else:
                        return jsonify(errormsg.leave_exist)
                else:
                    isInserted = DB_Connection.insert_execution("INSERT INTO Leave_management(personid,Leave_name,leave_reason,type,leave_from,leave_to,status) VALUES(%s,%s,%s,%s,%s,%s,%s)",(int(data['id']),data['leavename'],data['reason'],data['type'],get_strtdt,get_enddt,"PENDING"))
                    if isInserted:
                        return jsonify(errormsg.leave_apply)
                    else:
                        return jsonify(errormsg.something_wrong)
            else:
                return jsonify(errormsg.leave_date_issue)
        else:
            return jsonify(errormsg.leave_strt_issue)
    else:
        return jsonify(errormsg.mandetory_error)


@app.route('/leaverequest',methods = ['POST'])
def leaverequest():
    data = request.get_json()
    get_leave_request = DB_Connection.select_execution('SELECT * FROM (select usr.employee_id,usr.FullName,lve.Leave_name,lve.personid,lve.leave_reason,lve.type,lve.leave_from,lve.leave_to,lve.leave_id,lve.status from users usr inner join Leave_management lve on usr.personid = lve.personid) TMP_TBL WHERE status = "PENDING" AND personid NOT IN (%s)',(int(data['personid']),))
    return jsonify(get_leave_request)


@app.route('/leaverequestaction',methods = ['POST'])
def leaverequestaction():
    data = request.get_json()
    isupdated = DB_Connection.update_executaion("UPDATE Leave_management SET status = %s WHERE leave_id = %s",(data['status'],data['val']))
    if isupdated:
        if data['status'] == 'APPROVED':
            return jsonify(errormsg.approved)
        else:
            return jsonify(errormsg.rejected)
    else:
        return jsonify(errormsg.something_wrong)


@app.route('/leavestatus',methods = ['POST'])
def leavestatus():
    data = request.get_json()
    if data['status']:
        get_leave_request = DB_Connection.select_execution('SELECT * FROM (select usr.employee_id,usr.FullName,lve.Leave_name,lve.personid,lve.leave_reason,lve.type,lve.leave_from,lve.leave_to,lve.leave_id,lve.status from users usr inner join Leave_management lve on usr.personid = lve.personid) TMP_TBL WHERE status = %s AND personid = %s',(data['status'],int(data['personid'])))
        return jsonify(get_leave_request)
    else:
        return jsonify(errormsg.mandetory_error)


@app.route('/getfeatures',methods=['POST'])
def getfeatures():
    data = request.get_json()
    if data['roleid']:
        get_role_2_features = DB_Connection.select_execution('''SELECT Dashboard,Employee_control,Leave_Control,Attendance_Control,Holiday_Control,Add_Employee,Upd_Employee_Detail,
                                                             Show_Employee,Edit_Employee,Leave_Status,Apply_Leave,Leave_request,Submit_Attendance,Miscellaneous,Add_Holiday,
                                                             Show_holiday,Delete_Holiday FROM feature_2_role_tbl WHERE role_id = %s''',(int(data['roleid']),))
        return jsonify(get_role_2_features)
    else:
        return jsonify(errormsg.something_wrong)


@app.route('/dashboarddata',methods = ['GET','POST'])
def getdashboarddata():
    
    if request.method =='GET':
        get_tot_emp = DB_Connection.select_execution("SELECT COUNT(PERSONID) AS TOTAL_EMP FROM Existing_Empolyee WHERE Isexisting = 'YES'")[0][0]
        get_Online_Emp = DB_Connection.select_execution("SELECT COUNT(personid) as Emp_Online FROM Attendance_register WHERE DATE(attendance_date) = CURDATE()")[0][0]
        get_work_from_office = DB_Connection.select_execution("SELECT COUNT(PERSONID) AS EMP_OFFICE FROM ATTENDANCE_REGISTER WHERE TYPE = 'O' AND DATE(attendance_date) = CURDATE()")[0][0]
        get_work_from_home = DB_Connection.select_execution("SELECT COUNT(PERSONID) AS EMP_OFFICE FROM ATTENDANCE_REGISTER WHERE TYPE = 'H' AND DATE(attendance_date) = CURDATE()")[0][0]
        get_work_from_client_location = DB_Connection.select_execution("SELECT COUNT(PERSONID) AS EMP_OFFICE FROM ATTENDANCE_REGISTER WHERE TYPE = 'C' AND DATE(attendance_date) = CURDATE()")[0][0]
        return jsonify({"Total_Employee":get_tot_emp,"Employee_Online":get_Online_Emp,"get_work_from_office":get_work_from_office,"get_work_from_home":get_work_from_home,"get_work_from_client_location":get_work_from_client_location})
    
    if request.method =='POST':
        data = request.get_json()
        emp_details = []
        if data['type'] != 'L':
            QUERY = "SELECT usr.FullName,usr.employee_id FROM users usr inner join (SELECT personid FROM ATTENDANCE_REGISTER WHERE TYPE = %s AND DATE(attendance_date) = CURDATE()) TEMP_TBL ON usr.Personid = TEMP_TBL.personid"
            get_emp_detils = DB_Connection.select_execution(QUERY,(data['type'],))
            for emp in get_emp_detils:
                emp_name = emp[0]
                emp_id = emp[1]
                emp_details.append([emp_name,emp_id])
        else:
            QUERY = "SELECT usr.FullName,usr.employee_id,TEMP_TBL.personid FROM users usr LEFT join (SELECT personid FROM ATTENDANCE_REGISTER WHERE DATE(attendance_date) = CURDATE()) TEMP_TBL ON usr.Personid = TEMP_TBL.personid WHERE TEMP_TBL.personid IS NULL"
            get_emp_detils = DB_Connection.select_execution(QUERY)
            for emp in get_emp_detils:
                emp_name = emp[0]
                emp_id = emp[1]
                emp_details.append([emp_name,emp_id])
        return jsonify({"employee_details":emp_details})


if __name__ == 'main':
    app.run(debug=True)