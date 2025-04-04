import AuthUtils from "../utils/authUtil.js";

const { hashingPassword, comparePassword } = new AuthUtils();

test("Password Hasing", async () => {
  const password = "testingpassword";
  const hashedpassword = await hashingPassword(password);
  //   expect(hashedpassword).toBe( "$2y$10$sEv.L77LJA6WfTJpJzJUyuFnjHfqIrfUe8vgHuNJiyy35vUJ7jbCi");
  expect(hashedpassword).not.toBe(password);
  expect(hashedpassword.length).toBeGreaterThan(10);
});

test("Password Compare", async () => {
  const password = "testingpassword";
  const hashedPassword = await hashingPassword(password);
  expect(await comparePassword(password, hashedPassword)).toBe(true);
});
