import fs from 'fs';
import readline from 'readline';

export interface LogEntry {
  timestamp: number;
  loglevel: string;
  transactionId: string;
  err: string;
}

export class LogParser {
  private inputFile: string;
  private outputFile: string;

  constructor(inputFile: string, outputFile: string) {
    this.inputFile = inputFile;
    this.outputFile = outputFile;
  }

  public async parseLogs(): Promise<void> {
    const logEntries: LogEntry[] = [];
    const fileStream = fs.createReadStream(this.inputFile);
    const rl = readline.createInterface({ input: fileStream });

    for await (const line of rl) {
      const logEntry = this.parseLogLine(line);
      if (logEntry && logEntry.loglevel === 'error') {
        logEntries.push(logEntry);
      }
    }

    this.writeOutputFile(logEntries);
  }

  public parseLogLine(line: string): LogEntry | null {
    const logParts = line.split(' - ');
    if (logParts.length >= 3) {
      const timestamp = new Date(logParts[0]).getTime();
      const loglevel = logParts[1].trim();
      const logData = JSON.parse(logParts.slice(2).join(' - '));

      return {
        timestamp,
        loglevel,
        transactionId: logData.transactionId,
        err: logData.err || '',
      };
    }

    return null;
  }

  private writeOutputFile(logEntries: LogEntry[]): void {
    const jsonOutput = JSON.stringify(logEntries);
    fs.writeFileSync(this.outputFile, jsonOutput);
  }
}

// Read command-line arguments
const args = process.argv.slice(2);
const inputFile = args.find(arg => arg.startsWith('--input'))?.split('=')[1];
const outputFile = args.find(arg => arg.startsWith('--output'))?.split('=')[1];

if (!inputFile || !outputFile) {
  console.log('Usage: ts-node parser.ts --input <inputFile> --output <outputFile>');
} else {
  const logParser = new LogParser(inputFile, outputFile);
  logParser.parseLogs()
    .then(() => console.log('Log parsing completed.'))
    .catch(error => console.error('An error occurred during log parsing:', error));
}



