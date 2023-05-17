declare type AnyObject = { [key: number | string]: any };
declare type NumberObject = { [key: number]: number };
declare type StringObject = { [key: string]: string };


declare interface ResponseError {
    message: string;
    code: number;
    data?: AnyObject;
}