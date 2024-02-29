import { Helmet } from 'react-helmet-async';

import OneView from 'src/sections/one/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Tasks</title>
      </Helmet>

      <OneView />
    </>
  );
}
