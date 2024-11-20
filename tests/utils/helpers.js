import { TEXTS, CREDENTIALS, BUTTONS, SELECTORS } from './testData.js';

export async function login(page) {
  await page.getByPlaceholder(TEXTS.emailPlaceholder).fill(CREDENTIALS.email);
  await page.getByPlaceholder(TEXTS.passwordPlaceholder).fill(CREDENTIALS.password);
  await page.getByRole('button', { name: BUTTONS.login, exact: true }).click();
}

export async function scheduleAppointment(page) {
  await page.waitForSelector(`button:has-text("${BUTTONS.schedule}")`);
  await page.locator(`button:has-text("${BUTTONS.schedule}")`).click();
  await page.getByRole('button', { name: BUTTONS.prescriptionConsultation }).click();
}

export async function fillPrescriptionForm(page) {
  await page.locator('div').filter({ hasText: new RegExp(`^${TEXTS.drugPlaceholder}$`) }).nth(1).click();
  await page.locator(SELECTORS.drugInput).fill(TEXTS.drugName);
  await page.locator(SELECTORS.drugOption).first().click();

  await page.locator(SELECTORS.packageSizeDropdown).click();
  await page.getByText(TEXTS.packageSize, { exact: true }).click();
  await page.locator('label').filter({ hasText: TEXTS.acceptDoctorLabel }).click();
}

export async function confirmAppointment(page) {
  await page.getByRole('button', { name: BUTTONS.choose }).click();
  await page.getByText(TEXTS.selectAll).click();
  await page.getByRole('button', { name: BUTTONS.confirm }).click();
}
