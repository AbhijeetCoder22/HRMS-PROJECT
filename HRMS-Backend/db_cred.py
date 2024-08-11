import mysql.connector


host_name = "localhost"
user_name = "root"
password = "@Bhijeet1"


class MydbCred:
    def __init__(self,host=host_name,user=user_name,pswd=password,database="HRMS"):
        self.host = host
        self.user = user
        self.paswd = pswd
        self.database = database
        self.__db_call()
    
    def __db_call(self):
        mydb = mysql.connector.connect(
            host = self.host,
            user = self.user,
            password=self.paswd,
            database = self.database
        )
        return mydb
    
    def select_execution(self,query,param=()):
        connect = self.__db_call()
        mycursor = connect.cursor()
        if param:
            mycursor.execute(query,param)
        else:
            mycursor.execute(query)
        myresult = mycursor.fetchall()
        return myresult

    def insert_execution(self,query,param):
        connect = self.__db_call()
        mycursor = connect.cursor()
        mycursor.execute(query,param)
        connect.commit()
        if mycursor.rowcount:
            return True
        else:
            return False
        
    def update_executaion(self,query,param):
        connect = self.__db_call()
        mycursor = connect.cursor()
        mycursor.execute(query,param)
        connect.commit()
        if mycursor.rowcount:
            return True
        else:
            return False
        
    def delete_executaion(self,query,param):
        connect = self.__db_call()
        mycursor = connect.cursor()
        mycursor.execute(query,param)
        connect.commit()
        if mycursor.rowcount:
            return True
        else:
            return False
        
    def select_execution_cursor(self,query,param=()):
        connect = self.__db_call()
        mycursor = connect.cursor()
        if param:
            mycursor.execute(query,param)
        else:
            mycursor.execute(query)
        myresult = mycursor.fetchall()
        return myresult,mycursor