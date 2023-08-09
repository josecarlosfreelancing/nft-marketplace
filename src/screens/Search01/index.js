import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";

// import backPic from '../../assets/img/bg/background.jpg'
// import searchIcon from '../../assets/img/gallery/searchIcon.svg'
import { ApplicationModal, attributes } from '../../constants'
// import plusIcon from '../../assets/img/gallery/plus.svg'
// import minusIcon from '../../assets/img/gallery/minus.svg'
import { useGalleryModalToggle, useModalOpen } from '../../hooks/store'
// import { GalleryModal } from '../../components/galleryModal'
import Gallery from "../../components/Gallery";
import useNFTMoralis from '../../hooks/useNFTMoralis';
import Checkbox from "../../components/Checkbox";
import Attribute from "./Attribute";
// import placeholderSrc from '../../assets/img/gallery/placeholder.png'
// import ProgressiveImg from './galleryImage'
// data
import { bids } from "../../mocks/bids";
import Modal from "../../components/Modal";

const navLinks = ["All items", "Art", "Game", "Photography", "Music", "Video"];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most liked"];

const Search = () => {

  const [ showFilter, setShowFilter ] = useState(false)
  const [ searchAttr, setSearchAttr ] = useState([])
  const [ nftDetail, setNftDetail ] = useState({})
  const [ showCount, setShowCount ] = useState(20)
  const [ searchTokenId, setSearchTokenId ] = useState('')

  // const openModal = useModalOpen( ApplicationModal.GALLERY )
  // const toggleModal = useGalleryModalToggle()
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = (value) => {
    setOpenModal(value);
  }
  const { allNFTData } = useNFTMoralis()

  const getFilteredData = (data) => {

    return data.filter((item) => {
        const metadata = JSON.parse(item.metadata)

        if( searchTokenId !== '' && Number(item.token_id) !== Number(searchTokenId) )
            return false

        for( let i = 0; i < searchAttr.length; i++ ) {
            if (!metadata)
                continue

            const temp = searchAttr[i]
            const index = metadata.attributes.findIndex((attr) => attr.trait_type === temp.trait_type && attr.value === temp.value)

            if( index === -1 )  return false
        }

        return true
    })
  }
  const dataArray = getFilteredData(allNFTData).slice(0, showCount)

  const toggleAttr = ( name, attr ) => {
      console.log(name)
      console.log(attr)

      const newSearchAttr = [ ...searchAttr ]

      const index = newSearchAttr.findIndex( (item) => item.trait_type === name && item.value === attr )

      if( index === -1 )
          newSearchAttr.push({ trait_type: name, value: attr })
      else
          newSearchAttr.splice( index, 1 )

      setSearchAttr(newSearchAttr)
  }

  const detectScroll = () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 90 / 100)) {
          setShowCount(prev => prev + 20)
      }
  }

  useEffect(() => {
      window.addEventListener('scroll', detectScroll)

      return (() => window.removeEventListener('scroll', detectScroll))
  }, [])

  const onClickImage = (item) => {
      setNftDetail(item)

      toggleModal(true)
      console.log('over here')
  }

  const handleClearFilter = () => {
      setSearchAttr([])
      setSearchTokenId('')
  }
  /*-------------------------------------------------------------*/
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [date, setDate] = useState(dateOptions[0]);
  // const [likes, setLikes] = useState(likesOptions[0]);
  // const [color, setColor] = useState(colorOptions[0]);
  // const [creator, setCreator] = useState(creatorOptions[0]);

  // const [search, setSearch] = useState("");

  // const [values, setValues] = useState([5]);

  // const handleSubmit = (e) => {
  //   alert();
  // };

  // const STEP = 0.1;
  // const MIN = 0.01;
  // const MAX = 10;

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        {/* <div className={styles.top}>
          <div className={styles.title}>Type your keywords</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div> */}
        {/* <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={() => setActiveIndex(index)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
        </div> */}
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.range}>
              <div
                className={styles.search}
              >
                <input
                  className={styles.input}
                  type="text"
                  name="search"
                  placeholder="Token ID..."
                  required
                  value={ searchTokenId } 
                  onChange={ (ev) => setSearchTokenId( ev.target.value ) }
                />
                <button className={styles.result}>
                  <Icon name="search" size="16" />
                </button>
              </div>
              {/* <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}
                    </div>
                  </div>
                )}
              /> */}
              {/* <div className={styles.scale}>
                <div className={styles.number}>0.01 ETH</div>
                <div className={styles.number}>10 ETH</div>
              </div> */}
            </div>
            <div className={styles.group}>
            { Object.keys(attributes).map( (item, index) => (
                <div key={ `attributes_${index}` }>
                    <Attribute name={ item } searchAttr={ searchAttr } toggleAttr={ toggleAttr } />
                </div>
            )) }
              {/* <div className={styles.item}>
                <div className={styles.label}>Background</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={likes}
                  // setValue={setLikes}
                  options={likesOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Bag</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={color}
                  // setValue={setColor}
                  options={colorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Ears</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={creator}
                  // setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Eyes</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={creator}
                  // setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Fannypack</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={creator}
                  // setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Feet</div>
                <Dropdown
                  className={styles.dropdown}
                  // value={creator}
                  // setValue={setCreator}
                  options={creatorOptions}
                />
              </div> */}
            </div>
            {/* <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div> */}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {dataArray.map((x, index) => (
                <Card 
                  className={styles.card} 
                  item={x} 
                  key={index} 
                  open={ () => onClickImage(x) }
                />
              ))}
              { allNFTData.length > 0 && !dataArray.length ? (
                <div className={styles.nothing}>
                    <div className={cn('h4')}>No search result found.</div>
                    {/* <button className={cn("button-stroke",styles.button)} onClick={handleClearFilter}>Clear Filters</button> */}
                </div>
              ) : null }
            </div>
            {/* <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Modal
        visible={openModal}
        onClose={() => toggleModal(false) }
      >
        <Gallery nftDetail={nftDetail} />
      </Modal>
    </div>
  );
};

export default Search;
