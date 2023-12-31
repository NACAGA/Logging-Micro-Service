async function getLogs(query) {
    const getLogsResult = await db.query('SELECT * FROM ServiceEvents');
    if (getLogsResult instanceof Error.BusinessError) return getLogsResult;

    return null;
}

module.exports = { getLogs };
