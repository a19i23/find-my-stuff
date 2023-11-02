export const authenticate = async (page) => {
  await page.goto(process.env.NEXT_PUBLIC_BASE_URL!);
  await page.getByLabel('Email address').fill(process.env.USER_LOGIN!);
  await page.getByLabel('Password').fill(process.env.PW!);
  await page.getByRole('button', { name: 'Continue' }).click();
};
