import CustomButton from '../../components/button/CustomButton';
import CustomDropdown from '../../components/dropdown/CustomDropdown';
import { MenuItemType } from 'antd/es/menu/interface';

export function Submission() {

  const items: MenuItemType[] = [
    {
      key: '1',
      label: 'Location 1',
    },
    {
      key: '2',
      label: 'Location 2',
    },
    {
      key: '3',
      label: 'Location 3',
    },
    {
      key: '4',
      label: 'Location 4',
    },
  ];
  
  function item (title: string, items: MenuItemType[], placeholderText: string) {
    return (
      <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '5px', width: '80px' }}>{title}</p>
        <CustomDropdown
          menuItems={items}
          placeholderText={placeholderText}
          type={"primary"} // Optional: Specify button type
          placement={"bottomLeft"} // Optional: Specify placement
        />
      </div>
    );
  }

  function handleSubmission() {
    // Handle submission logic here
  }

  return (
    <div>
      <h1>Submit Location</h1>
      <p>Submit your location to the database.</p>

      {item("Location", items, "Location")}
      {item("Room", items, "Room")}

      <CustomButton style={{marginTop: '10px'}} onClick={handleSubmission}>Submit</CustomButton>
    </div>
  );
}

export default Submission;