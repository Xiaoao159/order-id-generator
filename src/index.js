const PUSH_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
let lastPushTime = 0;
let lastRandChars = [];

const orderId = (uid) => {
  if (uid.length != 28) throw new Error('UID length should be 28.');

  let now = new Date().getTime();
  const duplicateTime = (now === lastPushTime);
  lastPushTime = now;

  // CONVERT TimeStamp to CHARS
  const timeStampChars = new Array(8);
  let i;
  for (i = timeStampChars.length - 1; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 36);

    now = Math.floor(now / 36);
  }
  if (now !== 0) throw new Error('We should have converted the entire timestamp.');

  let id = timeStampChars.join('');

  // ADD random chars of UID
  if (!duplicateTime) {
    for (i = 0; i < 6; i++) {
      lastRandChars[i] = Math.floor(Math.random() * 28);
    }
  } else {
    for (i = 5; i >= 0 && lastRandChars[i] === 27; i--) {
      lastRandChars[i] = 0;
    }
    lastRandChars[i]++;
  }
  for (i = 0; i < 6; i++) {
    id += uid.charAt(lastRandChars[i]).toLowerCase();
  }

  // ADD 2 random CHARS
  for (i = 0; i < 2; i++) {
    id += PUSH_CHARS.charAt(Math.floor(Math.random() * 36)).toLowerCase();
  }

  // The id must be 16
  if (id.length != 16) throw new Error('Length should be 16.');

  return id;
};

export default orderId;
