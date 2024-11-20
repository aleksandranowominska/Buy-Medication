import { test, expect } from '@playwright/test';
import { URLS, TEXTS } from './utils/testData';
import { login, scheduleAppointment, fillPrescriptionForm, confirmAppointment } from './utils/helpers';

test('User journey from login to payment view', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds timeout to accommodate potential delays

  await page.goto(URLS.loginPage);

  // Login
  await login(page);

  // Schedule an appointment
  await scheduleAppointment(page);

  // Fill in the prescription form
  await fillPrescriptionForm(page);

  // Confirm the appointment
  await confirmAppointment(page);

  // Navigate to payment page and ensure it's loaded
  await page.goto(URLS.paymentPage);
  await page.waitForLoadState('networkidle'); // Await full load of payment page
  await expect(page.getByText(TEXTS.selectPayment)).toBeVisible();
});
