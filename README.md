# Log Parser App

The Log Parser App is a command line Node.js application designed to parse log files and extract error logs. It allows you to process log files and filter out log messages with the level "error", providing you with a separate output file containing the error logs.

## Problem

When dealing with large log files, it can be time-consuming and tedious to manually search for error logs. The Log Parser App solves this problem by automating the process of parsing log files and extracting error logs, saving you time and effort.

## Usage

To use the Log Parser App, follow these steps:

1. Make sure you have Node.js v18+ installed on your system.

2. Download or clone the Log Parser App repository.

3. Open a terminal or command prompt and navigate to the root directory of the Log Parser App.

4. Install the required dependencies by running the following command:

`npm install`

5. Prepare your log file in the expected format. Each log entry should be in the following format:

`<ISO Date> - <Log Level> - {"transactionId": "<UUID>", "details": "<message event/action description>", "err": "<Optional, error description>", ...<additional log information>}`


6. Run the Log Parser App by executing the following command, replacing `<inputFile>` with the path to your log file and `<outputFile>` with the desired path for the output file:

`node parser.js --input=<inputFile> --output=<outputFile>`

For example:

`npx ts-node parser.ts --input=./app.log --output=./errors.json`


7. The Log Parser App will process the log file, extract error logs, and save them into the specified output file.

## Output Format

The extracted error logs will be saved in JSON format with the following structure:

`[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId": "<UUID>", "err": "<Error message>"}]`


You can customize the output file path and name according to your preferences.

## Requirements

- TypeScript OOP project.
- Node.js v18+.
- Designed in accordance with OOD principles (DRY, SLAP, SOLID, etc).
- Unit-testing ready (or partially covered by tests).
- Flexibility of the architecture. The application should be easy to extend and modify.

## LogParser Class Functions

The LogParser class provides the following functions:

### parseLogs(inputFilePath: string): LogEntry[]

- This function is responsible for parsing the log file and extracting the log entries.
- It takes the `inputFilePath` as a parameter, which specifies the path to the input log file.
- It reads the log file line by line, calls the `parseLogLine` function to parse each line into a `LogEntry` object, and stores the parsed entries in an array.
- Finally, it returns the array of parsed log entries.

### parseLogLine(line: string): LogEntry

- This function is used internally by the `parseLogs` function to parse a single log line into a `LogEntry` object.
- It takes a `line` string as a parameter, representing a single line from the log file.
- It uses regular expressions and string manipulation to extract the relevant information from the log line and create a `LogEntry` object with the parsed data.
- The `LogEntry` object includes properties such as `timestamp`, `logLevel`, `transactionId`, and `err`.

### writeOutputFile(outputFilePath: string, logEntries: LogEntry[]): void

- This function is responsible for writing the extracted log entries into the output file.
- It takes the `outputFilePath` as a parameter, specifying the path to the output file, and the `logEntries` array containing the extracted log entries.
- It converts the `logEntries` array to JSON format, and then writes the JSON data to the specified output file using the `fs.writeFile` function.
- If the write operation is successful, the function completes without returning a value. If there is an error during the write operation, an error message will be logged.


## Notes

- The Log Parser App uses TypeScript to ensure type safety and provide a more maintainable codebase.
- The application is structured using Object-Oriented Programming (OOP) principles, making it modular and extensible.
- Unit tests are included to verify the functionality of the Log Parser App.
- The application uses Babel to transpile the TypeScript code to JavaScript. The `babel.config.js` file specifies the Babel configuration to support non-standard JavaScript syntax and ensure compatibility across different versions of Node.js.

