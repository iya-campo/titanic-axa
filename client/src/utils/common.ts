export const mapPort = (key: string) => {
  switch (key) {
    case 'C':
      return 'Cherbourg';
    case 'Q':
      return 'Queenstown';
    case 'S':
      return 'Southampton';
    default:
      return 'Invalid Key';
  }
};

export const mapTicket = (key: number) => {
  switch (key) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    default:
      return 'Invalid Key';
  }
}

export const mapNames = (col: string) => {
  switch (col) {
    case 'Survived':
      return 'Survived';
    case 'Pclass':
      return 'Ticket Class';
    case 'Sex':
      return 'Sex';
    case 'Age':
      return 'Age';
    case 'SibSp':
      return '# of Sibling / Spouse';
    case 'Parch':
      return '# of Parent / Child';
    case 'Ticket':
      return 'Ticket Number';
    case 'Fare':
      return 'Passenger Fare';
    case 'Cabin':
      return 'Cabin Number';
    case 'Embarked':
      return 'Port of Embarkation';
    default:
      return 'Invalid Column';
  }
}

export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
