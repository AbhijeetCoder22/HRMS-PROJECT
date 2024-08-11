import db_cred as db


DB_Connection = db.MydbCred()


def add_holiday(data):
    if data['holidayname'] and data['startDates'] and data['type']:
        isExist = DB_Connection.select_execution("SELECT * FROM holiday_list_tbl WHERE date=%s and name=%s and type=%s",(data['startDates'],data['holidayname'],data['type']))
        if not isExist:
            isAdded = DB_Connection.insert_execution("INSERT INTO holiday_list_tbl(date,name,type) VALUES(%s,%s,%s)",(data['startDates'],data['holidayname'],data['type']))
            if isAdded:
                return "HOLIDAY ADDED SUCCESSFULLY !!!"
            else:
                return "SOMETHING WENT WRONG TRY AFTER SOMETIME !!!"
        else:
            return "HOLIDAY ALREADY ADDED TO LIST !!!"
    else:
        return "ALL FIELDS ARE MANDETORY !!!"