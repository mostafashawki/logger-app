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

}


