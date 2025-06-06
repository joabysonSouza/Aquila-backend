import { GenericContainer, StartedTestContainer } from "testcontainers";
import mongoose from "mongoose";

class ConnectToTestDatabase {
  private mongoContainer: StartedTestContainer | null = null;

  async execute() {
    try {
      this.mongoContainer = await new GenericContainer("mongo:latest")
        .withExposedPorts(27017)
        .start();

      const host = this.mongoContainer.getHost();
      const port = this.mongoContainer.getMappedPort(27017);

      const mongoUrl = `mongodb://${host}:${port}/testdb`;

      await mongoose.connect(mongoUrl);

      console.log(`Test Container Up.`);
    } catch (error: any) {
      console.log("Test Container Error:", error);
    }
  }

  async disconnect() {
    if (this.mongoContainer) {
      await mongoose.disconnect();
      await this.mongoContainer.stop();
      console.log("Test Container Down.");
    }
  }
}

export default new ConnectToTestDatabase();
