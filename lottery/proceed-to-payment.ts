async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomSleepTime(min = 750, max = 1250): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function waitForElement(
  selector: string,
  interval = 100,
  timeout = 10000
): Promise<Element> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkInterval);
        resolve(element);
      } else if (Date.now() - start >= timeout) {
        clearInterval(checkInterval);
        reject(
          new Error(
            `Element with selector "${selector}" not found within ${timeout} ms`
          )
        );
      }
    }, interval);
  });
}

async function clickElement(selector: string): Promise<void> {
  try {
    const element = await waitForElement(selector);
    (element as HTMLElement).click();
    await sleep(getRandomSleepTime());
  } catch (error) {
    console.error(`Error clicking element ${selector}:`, error);
  }
}

async function proceedToPayment(): Promise<void> {
  try {
    await clickElement("#irparapagamento");
    await clickElement("#confirma");
    console.warn("Payment process initiated");
  } catch (error) {
    console.error("Error proceeding to payment:", error);
  }
}

(async function () {
  await proceedToPayment();
})();
