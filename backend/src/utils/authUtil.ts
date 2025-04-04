import { genSalt, compare, hash } from "bcrypt";
import { log } from "console";

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
  async hashingPassword(password: string) {
    const salt = await genSalt(10);
    const hashedpassword = await hash(password, salt);
    return hashedpassword;
  }

  async comparePassword(password: string, hash: string) {
    const res = await compare(password, hash);
    return res;
  }
}

export default AuthUtils;
