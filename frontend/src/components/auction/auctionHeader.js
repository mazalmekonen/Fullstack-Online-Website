import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateProducts} from '../../store/actions';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import {BsListUl} from 'react-icons/bs';
import {DropdownButton,Dropdown} from 'react-bootstrap'

function AuctionHeader({original,setCurrentPage,sortByElement,titleUp,priceUp}){
    const selectedClass = 'auction-filterBy-button-selected';
    const notSelectedClass = 'auction-filterBy-button';
    const [toSearch,setToSearch] = useState('');
    const [toggleAll,setToggleAll] = useState(selectedClass);
    const [toggleCars,setToggleCars] = useState(notSelectedClass);
    const [toggleComputerParts,setToggleComputerParts] = useState(notSelectedClass);
    const [toggleFurniture,setToggleFurniture] = useState(notSelectedClass);
    const [toggleMiscellaneous,setToggleMiscellaneous] = useState(notSelectedClass);
    const [toggleTech,setToggleTech] = useState(notSelectedClass);
    const [CurrentToggle,setCurrentToggle] = useState('All Catagories');
    const [catagoryFilteredProducts,setCatagoryFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(()=>{
      if(state !== null){
        setCatagoryFilteredProducts(state.original);
      }else if(original.length > 0){
        setCatagoryFilteredProducts(original);
      }
    },[original,state]);
    const filterBySearch = (e) =>{
        if(e.key === 'Enter' || e.key === undefined){
            dispatch(updateProducts(original));
            const temp = catagoryFilteredProducts.filter((product)=>  {
                return product.title.toLowerCase().includes(toSearch.toLowerCase());
            });
            dispatch(updateProducts(temp));
            setToSearch('');
        }
    }
    const filterByCatagory = (catagory) =>{
        setCatagoryFilteredProducts(original);
        setCurrentPage(1);
        if(catagory !== 'all'){
            const temp = original.filter((product)=>  {
                    return product.catagory.toLowerCase() === catagory.toLowerCase();
                });
            dispatch(updateProducts(temp));
            setCatagoryFilteredProducts(temp);
        }else{
          dispatch(updateProducts(original));
        }
    }
    const handleToggle = (e) =>{
      let name = e.target.name;
      switch(name){
        case 'all':
          setToggleAll(selectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          setCurrentToggle('All Catagories');
          filterByCatagory('all');
          break;
        case 'cars':
          setToggleCars(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          setCurrentToggle('Cars');
          filterByCatagory('cars');

          break;
        case 'computer parts':
          setToggleComputerParts(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          setCurrentToggle('Computer-parts');
          filterByCatagory('computer parts');

          break;
        case 'furniture':
          setToggleFurniture(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          setCurrentToggle('Furniture');
          filterByCatagory('furniture');

          break;
        case 'tech':
          setToggleTech(selectedClass)
          setToggleMiscellaneous(notSelectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setCurrentToggle('Tech');
          filterByCatagory('tech');
          break;
        case 'miscellaneous':
            setToggleMiscellaneous(selectedClass);
            setToggleTech(notSelectedClass);
            setToggleAll(notSelectedClass);
            setToggleCars(notSelectedClass);
            setToggleComputerParts(notSelectedClass);
            setToggleFurniture(notSelectedClass);
            setCurrentToggle('Miscellaneous');
            filterByCatagory('miscellaneous');
            break;
          default:
            break;
      }
    }
    return(
        <div id = {'auction-header'}>
              <section id={'auction-search'}>
                <input id={'auction-search-input'} placeholder='Quick Search' onChange={(e)=>{setToSearch(e.target.value)}} value={toSearch} onKeyUp={filterBySearch}/>
                <button id = {'auction-search-button'} onClick={filterBySearch}>Search</button>
              </section>
              <section id={'auction-header-sortBy'}>
                <DropdownButton id={'auction-header-filterBy'} title={<div style={{position:'relative'}}><BsListUl id={'auction-sortby-icon'}/>{CurrentToggle}</div>} className="mt-2">
                  <Dropdown.Item className={toggleAll} name={'all'} active={CurrentToggle==='All Catagories'} onClick={handleToggle}>All catagories</Dropdown.Item>
                  <Dropdown.Item className={toggleCars} name={'cars'} active={CurrentToggle==='Cars'} onClick={handleToggle}>Cars</Dropdown.Item>
                  <Dropdown.Item className={toggleComputerParts} name={'computer parts'} active={CurrentToggle==='Computer-parts'} onClick={handleToggle}>Computer-parts</Dropdown.Item>
                  <Dropdown.Item className={toggleFurniture} name={'furniture'} active={CurrentToggle==='Furniture'} onClick={handleToggle}>Furniture</Dropdown.Item>
                  <Dropdown.Item className={toggleTech} name={'tech'} active={CurrentToggle==='Tech'} onClick={handleToggle}>Tech</Dropdown.Item>
                  <Dropdown.Item className={toggleMiscellaneous} name={'miscellaneous'} active={CurrentToggle==='Miscellaneous'} onClick={handleToggle}>Miscellaneous</Dropdown.Item>
                </DropdownButton>
                <button id={'auction-header-sort-name'} onClick={()=>{sortByElement('title')}}>Product name {titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</button>
                <button id={'auction-header-sort-price'} onClick={()=>{sortByElement('price')}}>Product price {priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</button>
              </section>
            </div>
    )
}
export default AuctionHeader;