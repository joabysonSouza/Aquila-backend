import { initApp } from "./app";

initApp().then((app) => {
  const port = 3005;
  app.listen(port, () => console.log(`Server running in port: ${port}`));
});
