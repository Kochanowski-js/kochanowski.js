import { KError } from "../models/ErrorHandler.js";

export function notImplemented ()
{
    throw new KError("Not implemented yet", 0)
}