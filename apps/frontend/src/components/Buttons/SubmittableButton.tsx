import React, { useState } from 'react';
import { Button, Form, FormInstance } from 'antd';

const SubmitButton = ({
  form,
  className,
  children,
}: {
  form: FormInstance;
  className?: string;
  children: React.ReactNode;
}) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button htmlType="submit" disabled={!submittable} className={className}>
      {children}
    </Button>
  );
};

export default SubmitButton;
