import Application from "./application.js";
async function main() {
  try {
    const app = new Application();
    await app.run();
  } catch (e) {
    console.log(`Error on app : ${e.toString()} `);
  }
}

main();
