const ButtonMailto = ({ email, subject = '', body = '', children }) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  console.log('inside button mailto');
  return <a href={`mailto:${email}${params}`}>{children}</a>;
};
export default ButtonMailto ;