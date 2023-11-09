import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
    base: {
        pid: false
    },
    timestamp: () => `, "Time": "${dayjs().format()}"`,
});

export default log;