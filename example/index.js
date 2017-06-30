import orderId from '../../dist/index';

const uid = 'x84zLYuvLHhlpoHbR93vytP0wsVU';
const id = orderId(uid);
const formatted = id.slice(1, 4) + '-' + id.slice(4, 8) + '-' + id.slice(8, 12) + '-' + id.slice(12, 16);

console.log('ORDER ID: ', formatted);
