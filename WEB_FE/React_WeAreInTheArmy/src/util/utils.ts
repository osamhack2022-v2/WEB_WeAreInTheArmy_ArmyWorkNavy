import { Accept, AcceptanceStatus } from 'src/type';
import { client } from './client';

export const statusConverter = (accept: AcceptanceStatus): string => {
  switch (accept) {
    case AcceptanceStatus.PENDING:
      return '보류';
    case AcceptanceStatus.DENIED:
      return '거부';
    case AcceptanceStatus.ACCPEPTED:
      return '수락';
    default:
      return 'Error';
  }
};

export function setAuthroizationToken(token: string) {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common['Authoization'];
  }
}

export function isoStringToYYYYMMDD(isoString: string) {
  return isoString.substring(0, 10);
}
