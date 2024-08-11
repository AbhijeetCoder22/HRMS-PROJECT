import bcrypt


def generate_salt_password():
    #generating Salt for password
    salt = bcrypt.gensalt(12)
    return salt

def encode_password(password):
    #encoding the password
    encoded_pswd = password.encode('UTF-8')
    return encoded_pswd

def hashing_pswd(encoded_password,salt):
    #hashing encoded password
    hashed_pswd = bcrypt.hashpw(encoded_password,salt)
    return hashed_pswd

def compare_pswd(stored_password,UI_password):
    #comparing stored password and UI password
    return stored_password == UI_password
    