
const MAX_TEXT_LENGTH = 30;

export const truncateText = (text:string) => {
    if (text.length > MAX_TEXT_LENGTH) {
      return text.substring(0, MAX_TEXT_LENGTH) + '...';
    }

    return text
}