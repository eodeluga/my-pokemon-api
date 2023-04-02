export type GOOD = true;
export type BAD = false;

/** Output a task status message with optional status message
 * @param {boolean} isAllGood - Boolean representing whether status is ok or not
 * @param {string} msg - Optional status message
 */
const statusLog = (isAllGood: GOOD | BAD, msg?: string) => {
    const status = isAllGood ? "✓\n" : "💩\n";
    console.log(`${msg ? `${msg} ${status}` : status}`);
};

export default statusLog;
