const summaryContainer = document.querySelector('#application-summary');
const params = new URLSearchParams(window.location.search);

const requiredFields = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Mobile Phone' },
  { key: 'organization', label: 'Business / Organization Name' },
  { key: 'timestamp', label: 'Form Submitted Timestamp' }
];

if (summaryContainer) {
  requiredFields.forEach(({ key, label }) => {
    const dt = document.createElement('dt');
    dt.textContent = label;

    const dd = document.createElement('dd');
    const value = params.get(key);
    dd.textContent = value && value.trim() !== '' ? value : 'Not provided';

    summaryContainer.appendChild(dt);
    summaryContainer.appendChild(dd);
  });
}