import * as React from 'react'

export default function TempPage() {

  /**
   * State values
   */
  const [dataFromBackend, setDataFromBackend] = React.useState<string>("");

  // Backend url (dev)
  const backendUrl = 'http://localhost:3001';
  // Backend url (production virtual machine)
  // const backendUrl = '/api';

  React.useEffect(() => {
    // Fetch jurisdictions
    const getJurisdictionsUrl = `${backendUrl}/getCollection`
    fetch(getJurisdictionsUrl)
      .then(response => response.json())
      .then(data => {
        setDataFromBackend(JSON.stringify(data));
      })
  }, []);

  /**
   * Render
   */
   return (
    <div>
      <h3>
        {dataFromBackend}
      </h3>
    </div>
   );
}