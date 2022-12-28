import dotenv from "dotenv";


export enum RUN_CONTEXT {
    PRODUCTION,
    DEVELOPMENT,
    TEST
}

interface Paths {
    prodEnv?: string;
    testEnv?: string;
    devEnv?: string;
}

export abstract class AEnvVars {
    protected static isInitialized = false;

    public static RUN_CONTEXT = RUN_CONTEXT.PRODUCTION;


    protected static _load(loadCb: () => void, paths?: Paths): void {
        if (!this.isInitialized) {
            this.set_RUN_CONTEXT(paths);
            loadCb();
            this.isInitialized = true;
        }
    }

    private static set_RUN_CONTEXT(paths?: Paths): void {
        if (process.env.RUN_CONTEXT === "development") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            this.loadEnvs(paths?.devEnv);
        } else if (process.env.RUN_CONTEXT === "test") {
            this.RUN_CONTEXT = RUN_CONTEXT.TEST;
            this.loadEnvs(paths?.testEnv);
        } else {
            this.loadEnvs(paths?.prodEnv);
        }
    }

    private static loadEnvs(path?: string): void {
        path ? dotenv.config({ path }) : dotenv.config();
    }

    protected static setVar(envVarName: string, cb: (variable: unknown) => void, defaultVar?: unknown): void {
        if (process.env[envVarName]) {
            cb(process.env[envVarName]);
        } else if (defaultVar !== undefined) {
            cb(defaultVar);
        } else {
            throw new Error(`${envVarName} must be defined`);
        }
    }

    protected static Boolean(value: unknown): boolean {
        return value === true || value === "true";
    }
}