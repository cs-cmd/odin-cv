const formatEducationInputValues = (onChange, isCurrentlyAttending) => [
  {
    labelName: 'School Name',
    nameOnForm: 'school_name',
    placeholder: 'Example University',
    fieldName: 'name',
  },
  {
    labelName: 'Location',
    nameOnForm: 'location',
    placeholder: '123 Example St., Example, EX',
    fieldName: 'location',
  },
  {
    labelName: 'Curriculum',
    nameOnForm: 'curriculum',
    placeholder: 'Degree',
    fieldName: 'curriculum',
  },
  {
    labelName: 'Start Date',
    nameOnForm: 'from',
    type: 'date',
    fieldName: 'from',
  },
  {
    labelName: 'End Date',
    nameOnForm: 'to',
    type: 'date',
    isRequired: !isCurrentlyAttending,
    isDisabled: isCurrentlyAttending,
    fieldName: 'to',
  },
  {
    labelName: 'Currently Attending?',
    nameOnForm: 'isAttending',
    type: 'checkbox',
    onChange: onChange,
  }
];

// values for mapping InputItems in the Biographical section
const formatBioInputValues = () => [
  {
    labelName: 'Full Name',
    nameOnForm: 'full_name',
    placeholder: 'John Doe',
    fieldName: 'name',
  },
  {
    labelName: 'Email',
    type: 'email',
    nameOnForm: 'email',
    placeholder: 'example@example.com',
    fieldName: 'email',
  },
  {
    labelName: 'Phone Number',
    type: 'tel',
    nameOnForm: 'phone',
    placeholder: '000-000-0000',
    fieldName: 'phone',
  }
];

const formatWorkInputValues = (onChange, isCurrentEmployer) => [
  {
    labelName: 'Company Name',
    nameOnForm: 'company_name',
    placeholder: 'Example, Inc.',
    fieldName: 'company',
  },
  {
    labelName: 'Position',
    nameOnForm: 'company_position',
    placeholder: 'Worker',
    fieldName: 'position',
  },
  {
    labelName: 'Start Date',
    nameOnForm: 'from',
    type: 'date',
    fieldName: 'from',
  },
  {
    labelName: 'End Date',
    nameOnForm: 'to',
    type: 'date',
    isDisabled: isCurrentEmployer,
    isRequired: !isCurrentEmployer,
    fieldName: 'to',
  },
  {
    labelName: 'Current Employer?',
    nameOnForm: 'isCurrentEmployer',
    type: 'checkbox',
    onChange: onChange,
  }
];

export { formatBioInputValues, 
  formatEducationInputValues,
  formatWorkInputValues }