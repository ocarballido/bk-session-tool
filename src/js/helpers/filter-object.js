import { dateTimeFormater, todayDateTime } from './date-formatter';

export const filterdValues = (startDate, endDate, eventId, userId, offset, limit) => {
    // Create filter object
        // This way we reload the data with the filters updated
        const filterObject = {};
    
        // Update filter object
        filterObject.startDate = dateTimeFormater(startDate).date.toISOString();
        if (endDate !== '') {
            filterObject.endDate = dateTimeFormater(endDate).date.toISOString()
        }
        if (eventId !== 'all') {
            filterObject.eventId = eventId;
        }
        if (userId !== 'all') {
            filterObject.userId = userId;
        }
        if (offset !== undefined) {
            filterObject.offset = offset;
        }
        if (limit !== undefined) {
            filterObject.limit = limit;
        }

        return filterObject;
};