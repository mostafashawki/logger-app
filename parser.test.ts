import fs from 'fs';
import { LogParser } from './parser';

describe('LogParser', () => {
  let logParser;

  beforeEach(() => {
    logParser = new LogParser('./app.log', './errors.json');
  });

  it('should parse the log file and extract error logs', async () => {
    await logParser.parseLogs();

    const output = fs.readFileSync('./errors.json', 'utf8');
    const parsedOutput = JSON.parse(output);

    console.log(parsedOutput); // Output the parsed error logs

    // Assertions or checks for the parsed error logs
    expect(parsedOutput).toEqual([
      {
        timestamp: 1628475171259,
        loglevel: 'error',
        transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
        err: 'Not found',
      },
    ]);
  });
});
