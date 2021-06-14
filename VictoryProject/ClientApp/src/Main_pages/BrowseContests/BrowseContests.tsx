import * as React from "react";
import {useState} from "react";

import {Contest} from "../../Additional/Types";
import {ContestCard} from "../OrganisatorPages/Elements/ContestCard";
import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";
import {CreateContestModal} from "../../Forms/CreateContestModal";
import {Footer} from "../../Main_components/Footer";


import {useSidebar} from "../../hooks/useSidebar"
import {RouteComponentProps} from "@reach/router";

import {Box, createStyles, Dialog, IconButton, Paper, TextField} from "@material-ui/core";

import {receive, selectContests} from "../../state/contestSlice"
import {useDispatch, useSelector} from "react-redux";
import {Button, makeStyles, Toolbar, Typography} from "@material-ui/core/";
import {Pagination} from "@material-ui/lab";
import {SearchRounded} from "@material-ui/icons";


const tempContestData = (id: string) => {
    return {
        id: id,
        name: "Название" + id,
        notes: "Заметки о конкурсе",
        status: "Начат",
        role: Math.floor(Math.random() * 3),
        dateBeginning: Date.now(),
        dateEnding: Date.now() + 86400 * 1000,
        applyDateBeginning: Date.now() + 86400 * 1000 * 20,
        applyDateEnding: Date.now() + 86400 * 1000 * 31,
    }
};

const useStyles = makeStyles((Theme) => createStyles({
    pageContainer: {
        width: "100%",
        height: "auto",
        backgroundColor: Theme.palette.background.paper,
        display: "flex",
        flexGrow: 1,
        flexFlow: "column wrap",
        justifyContent: "space-between",
        alignContent: "center",
    },
    pageTitle: {
        backgroundColor: Theme.palette.secondary.main,
        width: "100%",
        height: "auto",
        paddingLeft: "20px",
        marginTop: "20px"
    },
    pagination: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        margin: "20px 0 20px 0"
    },
    searchContainer: {
        position: "sticky",
        top: "70px",
        zIndex: 1100,
        margin: "16px 16px 0 16px",
        backgroundColor: Theme.palette.secondary.main,
        color: Theme.palette.getContrastText(Theme.palette.secondary.main),
        borderRadius: "4px",
        boxShadow: Theme.shadows[4],
        display: "flex",
        justifyContent: "center"
    },
    searchField:{
        padding: "12px 10px",
        color: Theme.palette.getContrastText(Theme.palette.secondary.main),
        height:"5px",
        overflow: 'hidden',
        borderRadius: 4,

    },
    color: {
        color: Theme.palette.getContrastText(Theme.palette.background.paper),
        backgroundColor: Theme.palette.background.paper
    },
    footer:{
        
    }
}))

const generateTempData: object[] = [tempContestData("1"), tempContestData("2"), tempContestData("3"),
    tempContestData("4"), tempContestData("5"), tempContestData("6"), tempContestData("7"), tempContestData("8")]


export const BrowseContests = (props: RouteComponentProps) => {

    useSidebar()


    const contestsSelector = useSelector(selectContests)

    const [search, setSearch] = React.useState("");
    const [searching, setSearching] = React.useState(false);
    const [searchResults, setSearchResults] = useState<Contest[] | null>(null);
    const [searchRender, setSearchRender] = useState<Contest[] | null>(null);
    const [contests, setContests] = useState<Contest[] | null>(null);
    const [pageCount, setPageCount] = useState(contests? Math.ceil(contests.length!/5) : 1);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(searchResults)
        const sliceResults = searching ? searchResults?.slice((value-1)*5,value*5) : (contestsSelector as Contest[]).slice((value-1)*5,value*5)
        console.log(sliceResults)
        searching ? setSearchRender(sliceResults!) : setContests(sliceResults!)
    };
    
    const dispatch = useDispatch()

    dispatch(receive(generateTempData))

    const classes = useStyles()
    
    function handleSearch() {
        const searchFilter = (contestsSelector as Contest[])?.filter((item)=>{
            const normalized = {name:item.Name.toLowerCase(),notes:item.Comment.toLowerCase(), search: search.toLowerCase()}
            return normalized.name.includes(normalized.search) || normalized.notes.includes(normalized.search)
        })
        setSearchResults(searchFilter ? searchFilter : null)
        setSearchRender(searchFilter ? searchFilter.slice(0,5) : null)
        setSearching(true)
        setPageCount( searchFilter?.length! ? (Math.ceil(searchFilter?.length!/5)) : 1)
    }
    function handleSearchQueryChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setSearch(e.currentTarget.value)
        setSearching(false)
        setPageCount(Math.ceil(contestsSelector?.length!/5))
    }
    React.useEffect(() => {
       setContests((contestsSelector as Contest[]).slice(0,5))
       setPageCount(Math.ceil(contestsSelector?.length!/5))
    }, [contestsSelector])

    return (

        <React.Fragment>

            <Sidebar type={sidebarTypes.Org}/>

            <main className={classes.pageContainer}>

                <Paper elevation={0} square className={classes.pageTitle}>
                    <Typography className={classes.color} variant={"h3"}>Все конкурсы</Typography>
                </Paper>

                <div className="contestManagementContainer">
                    
                    <Toolbar className={classes.searchContainer}>
                        <Typography variant="h6" style={{paddingRight:"20px"}}>
                            Поиск:
                        </Typography>
                        <TextField onChange={(e)=>{handleSearchQueryChange(e)}} inputProps={{className:classes.searchField}} variant={"filled"}/>
                        <IconButton onClick={handleSearch} color="inherit"><SearchRounded/></IconButton>
                    </Toolbar>
                    {searching &&
                        <div className="managementContainer">
                            {searchRender && searchRender.map((item) => {
                                return <ContestCard controls={false} key={item.Id} contest={item} id={item.Id.toString()}/>
                            })}
                            {!searchRender && <Typography variant={"h5"}>Ничего не найдено</Typography>}
                        </div>
                    }
                    {!searching &&
                    <div className="managementContainer">
                        {contests && contests.map((item) => {
                            return <ContestCard controls={false} key={item.Id} contest={item} id={item.Id.toString()}/>
                        })}
                    </div>
                    }
                </div>

                <Pagination onChange={handleChangePage} className={classes.pagination} count={pageCount}/>

                <Footer className={classes.footer}/>
            </main>

        </React.Fragment>
    );
};
