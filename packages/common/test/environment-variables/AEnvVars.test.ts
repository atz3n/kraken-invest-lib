import { AEnvVars, RUN_CONTEXT } from "../../src";
import { config } from "../config";


class EnvVars extends AEnvVars {
    public static TEST_STRING = "";
    public static TEST_NUMBER = 0;

    public static TEST_BOOLEAN1 = false;
    public static TEST_BOOLEAN2 = false;
    public static TEST_BOOLEAN3 = false;
    public static TEST_BOOLEAN4 = false;

    public static TEST_DEFAULT = "";


    public static load(): void {
        this._load(() => {
            this.setVar("TEST_STRING", (envVar) => {
                this.TEST_STRING = String(envVar);
            });

            this.setVar("TEST_NUMBER", (envVar) => {
                this.TEST_NUMBER = Number(envVar);
            });

            this.setVar("TEST_BOOLEAN1", (envVar) => {
                this.TEST_BOOLEAN1 = this.Boolean(envVar);
            });
            this.setVar("TEST_BOOLEAN2", (envVar) => {
                this.TEST_BOOLEAN2 = this.Boolean(envVar);
            });
            this.setVar("TEST_BOOLEAN3", (envVar) => {
                this.TEST_BOOLEAN3 = this.Boolean(envVar);
            });
            this.setVar("TEST_BOOLEAN4", (envVar) => {
                this.TEST_BOOLEAN4 = this.Boolean(envVar);
            });

            this.setVar("TEST_DEFAULT", (envVar) => {
                this.TEST_DEFAULT = String(envVar);
            }, "default-value");
        }, { testEnv: __dirname + "/../test.env" });
    }
}

if (!config.skipTests.includes("envVars")) {
    it("should set the environment variables", async () => {
        EnvVars.load();
        expect(EnvVars.RUN_CONTEXT).toEqual(RUN_CONTEXT.TEST);
        expect(EnvVars.TEST_BOOLEAN1).toEqual(true);
        expect(EnvVars.TEST_BOOLEAN2).toEqual(true);
        expect(EnvVars.TEST_BOOLEAN3).toEqual(false);
        expect(EnvVars.TEST_BOOLEAN4).toEqual(false);
        expect(EnvVars.TEST_DEFAULT).toEqual("default-value");
        expect(EnvVars.TEST_NUMBER).toEqual(42);
        expect(EnvVars.TEST_STRING).toEqual("test-string");
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}