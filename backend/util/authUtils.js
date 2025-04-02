import bcrypt from "bcrypt";

/**
 * @author Jaseem
 * @class AuthUtils
 * @brief - Utility class related to User authentication.
 *
 * @method hashingPassword - Hash password and returnning it.
 * @param {string}password - Password String that need to be Hashed.
 *
 * @method comparePassword -  Comparing Hash and the password string returnning either true/false.
 * @param {string}hash - Hash password that need to be compared against.
 * @param {string}password - Password String that need to be compared.
 */

class AuthUtils {
  async hashingPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
  }

  async comparePassword(password, hash) {
    const res = await bcrypt.compare(password, hash);
    return res;
  }
}

export default AuthUtils;
