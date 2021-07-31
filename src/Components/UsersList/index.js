import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import Popup,{ PopUpHeader,PopupBody,PopupFooter, PopupContent} from '../Common/Popup';

const UsersList = props => {
    const [data,setData] = useState([]);
    const [updateItem, setUpdateItem] = useState(false);
    const [selectedDataItem,setSelectedDataItem] = useState({});
    useEffect(() => {
        getuserDetails();
    },[]);

    const getuserDetails = () => {
        axios.get('https://gorest.co.in/public-api/users').then(response => {
            setData(() => [...response.data.data]);
         })
    }

    const onUpdateClick = dataItem => {
        setUpdateItem(true);
        setSelectedDataItem(dataItem);
    };

    const handlePopupClose = () => {
        setUpdateItem(false);
    }

    const handleFormFieldChange = e => {
        setSelectedDataItem(prevState => {
            return {
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }

    const handleUpdateDataItem = () => {
        const { id,gender, ...restValues } = selectedDataItem;
        axios.patch(`https://gorest.co.in/public-api/users/${id}`,{...restValues},{
            headers:{
                "Accept":"application/json",
                "Content-Type":'application/json',
                "Authorization":"2f0efdc8ab7e3d1628d57a0e4a8a50472917c5796aa618116c3c7428513f88b7"
            }
        }).then(response => {
            console.log(response);
            if(response.data.code === 200){
                setUpdateItem(false);
                setSelectedDataItem({});
                getuserDetails();
                alert("Successfully updated")
            }else{
                setUpdateItem(false);
                setSelectedDataItem({});
                const errorMessage = response && 
                response.data &&
                response.data.data && 
                response.data.data.message || "Failed to update";
                alert(errorMessage);

            }
        })
    }

    return (
        <div>
            {
                data &&  data.length >0 && 
                <table width="100%">
                    {
                        Object.keys(data[0]).map( key => {
                            return (
                                <th>{key.toUpperCase()}</th>
                            )
                        })
                    }
                    {
                        data.map( dataItem => {
                            return (
                                <tr style={{'textAlign':'center'}}>
                                    {
                                        Object.keys(dataItem).map(dataItemKey => {
                                            return (
                                                <td>
                                                    {dataItem[dataItemKey]}
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <button onClick={() => onUpdateClick(dataItem)}>Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            }
            {
                updateItem &&
                <Popup>
                    <PopupContent>
                        <PopUpHeader title="Update Item" handlePopupClose={handlePopupClose}/>
                        <PopupBody>
                            <form>
                                <div>
                                    <lable className="form-elementLabel">Name:</lable>
                                    <input
                                    className="form-element-field" 
                                    value={selectedDataItem.name} 
                                    onChange={handleFormFieldChange}
                                    name="name" />
                                </div>
                                <div>
                                    <lable className="form-elementLabel">Email</lable>
                                    <input 
                                    className="form-element-field"
                                    onChange={handleFormFieldChange}
                                    value={selectedDataItem.email} 
                                    name="email"/>
                                </div>
                                <div>
                                    <lable className="form-elementLabel">Status</lable>
                                    <input 
                                    value={selectedDataItem.status} 
                                    onChange={handleFormFieldChange}
                                    name="status"/>
                                </div>
                            </form>
                        </PopupBody>
                        <PopupFooter handleOkClick={handleUpdateDataItem} handlePopupClose={handlePopupClose}/>
                    </PopupContent>
                </Popup>
            }
            
        </div>
    )

}

export default UsersList;