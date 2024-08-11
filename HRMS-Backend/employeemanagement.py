data_mapping_first_part = {
    'fname':0,
    'usrname':4,
    'mailid':1,
    'phnno':2,
    'empids':3,
    'postion':7
    }
column_mapping_first_part = {
    'fname':'FullName=%s',
    'usrname':'User_name=%s',
    'mailid':'Mailid=%s',
    'phnno':'Mobile_Number=%s',
    'empids':'employee_id=%s',
    'postion':'position=%s'
    }
data_mapping_second_part = {
    'aadhar':1,
    'pncrd':2,
    'addrs':3,
    'fthrnme':4,
    'mthrnme':5,
    'spnme':6,
    'tnthmrk':7,
    'tnthscl':8,
    'twthmrk':9,
    'twthclg':10,
    'gradmrk':11,
    'gradclg':12
    }
column_mapping_second_part = {
    'aadhar':'AadharCardNo=%s',
    'pncrd':'PANCardNo=%s',
    'addrs':'Address=%s',
    'fthrnme':'FatherName=%s',
    'mthrnme':'MotherName=%s',
    'spnme':'SpouceName=%s',
    'tnthmrk':'Martricpercent=%s',
    'tnthscl':'SchoolName=%s',
    'twthmrk':'twelvethpercent=%s',
    'twthclg':'Collegename=%s',
    'gradmrk':'graduationmark=%s',
    'gradclg':'graduationcollege=%s'
    }


def get_list_of_col_for_update(get_emp_dtls,part,val=2):
           
    update_col = []
    get_valus = []
    updated_string = ''
    if val == 1:
        for key in data_mapping_first_part:
            if get_emp_dtls[0][data_mapping_first_part[key]] != part[key]:
                update_col.append(column_mapping_first_part[key])
                updated_string = ''
                get_valus.append(part[key])
            
            
        for ind in range(len(update_col)):
            if ind == len(update_col)-1:    
                updated_string += update_col[ind]
            else:
                updated_string = updated_string + update_col[ind] + ','
    
    else:
        for key in data_mapping_second_part:
            if get_emp_dtls[0][data_mapping_second_part[key]] != part[key]:
                update_col.append(column_mapping_second_part[key])
                updated_string = ''
                get_valus.append(part[key])
            
            
        for ind in range(len(update_col)):
            if ind == len(update_col)-1:    
                updated_string += update_col[ind]
            else:
                updated_string = updated_string + update_col[ind] + ',' 
            
    return updated_string, get_valus