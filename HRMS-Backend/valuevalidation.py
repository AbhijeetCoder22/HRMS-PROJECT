import calendar
import datetime

def contains_special(value):
    value = str(value)
    list_of_sp_char = '''!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~'''
    is_sp_not_exist = False
    for char in value:
        if char in list_of_sp_char:
            is_sp_not_exist = True
            break
    return is_sp_not_exist


def validate_aadhar_no(value):
    value = str(value)
    is_aadharNumber = False
    if len(value) == 12 and value.isdigit():
        is_aadharNumber = True
    return is_aadharNumber


def validate_pan_no(value):
    value = str(value)
    cnts_sp_char = contains_special(value)
    if cnts_sp_char:
        return False
    else:
        if any(char.isalpha() for char in value) and any(char.isdigit() for char in value):
            if len(value) == 10:
                return True
            else:
                return False
            

def duplicate_validation(value):
    pass


def get_days_in_month(year, month):
    _, num_days = calendar.monthrange(year, month)
    return num_days

def date_format_covertion(dt):
    get_date = datetime.datetime.strptime(str(dt),'%Y-%m-%d').date()
    return get_date

def is_weekend(date_str):
    flag = False
    date = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    day_of_week = date.weekday()
    if day_of_week == 5:
        Flag = True
    elif day_of_week == 6:
        Flag = True
    else:
        Flag = False
    return Flag