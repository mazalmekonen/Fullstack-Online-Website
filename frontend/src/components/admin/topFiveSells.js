import {Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import { getTopFiveSells } from '../../services/mazalStoreApi';
import {sortUp,sortDown} from '../../utils';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';

function TopFiveSells(){
    const [data,setData] = useState([]);
    const [titleUp,setTitleUp] = useState(false);
    const [priceUp,setPriceUp] = useState(false);
    const [countUp,setCountUp] = useState(false);
    var counter = 1;
    useEffect(()=>{
        getTopFiveSells(setData);
    },[]);

    const sortByElement = (productElemtent) =>{
        var tempData = data;
        switch(productElemtent){
            case 'title':
                if(titleUp){
                    tempData.sort(function(a,b){
                        return sortUp(a._id,b._id,productElemtent);
                    });
                    setTitleUp(false);
                }else{
                    tempData.sort(function(a,b){
                        return sortDown(a._id,b._id,productElemtent);
                    });
                    setTitleUp(true);  
                }
                break;
            case 'price':
                if(priceUp){
                    tempData.sort(function(a,b){
                        return (b._id.price-a._id.price)
                    });
                    setPriceUp(false);
                }else{
                    tempData.sort(function(a,b){
                        return (a._id.price-b._id.price)
                    });
                    setPriceUp(true);  
                }
                break;
            case 'count':
                if(countUp){
                    tempData.sort(function(a,b){
                        return (b.count-a.count)
                    });
                    setCountUp(false);
                }else{
                    tempData.sort(function(a,b){
                        return (a.count-b.count)
                    });
                    setCountUp(true);  
                }
                break;
            default:
                break;
        }
        setData(tempData);
    }
return(
    <section>
         <div className='stats-title-container'>
                <h1 className='stats-title'>Top 5 Sells</h1>
            </div>
            <Table variant={"dark"} striped hover id='products-table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th onClick={()=>{sortByElement('title')}}>Product Name {titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                    <th onClick={()=>{sortByElement('count')}}>Count {countUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                    <th onClick={()=>{sortByElement('price')}}>Price {priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(transaction=>{
                        return(
                            <tr key={transaction._id.title}>
                                <td>{counter++}</td>
                                <td>{transaction._id.title}</td>
                                <td>{transaction.count}</td>
                                <td>{transaction._id.price} $</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    </section>
)
}
export default TopFiveSells;