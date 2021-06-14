import CreateSharpIcon from "@material-ui/icons/Create";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import React, {useState} from "react";
import {Link, navigate} from "@reach/router";

import {
    Card,
    Typography,
    CardHeader,
    createStyles,
    IconButton,
    Tooltip,
    Box,
    CardContent,
    Popper, Fade, Paper
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/";
import {Delete} from "@material-ui/icons";

interface Props {
    deleteState?: boolean;
    deleteContest?: (id:number) => void;
    controls: boolean;
    contest: any;
    id: string;
}

const useStyles = makeStyles((Theme) => createStyles({
    cardRoot: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center",
        height: "200px",
        maxHeight: "250px",
        minWidth: "600px",
        margin: Theme.spacing(2),
    },
    cardHeader: {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "row wrap",
        alignItems: "center",
        width: "100%"
    },
    cardBody: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    cardContent: {

        display: 'flex',
        flexGrow: 1,
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardControls: {
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: Theme.spacing(2),
    },
    cardLink: {

        "&:hover": {
            color: Theme.palette.secondary.main
        },
        transition: "color 400ms ease"
    },
    cardInfo: {
        display: "flex",
        padding: Theme.spacing(2),
    },
    paper: {
        maxWidth:"300px",
        padding: Theme.spacing(1),
        backgroundColor: Theme.palette.background.paper,
    },
    decorator: {
        width: "20px",
        height: "100%",
        backgroundColor: Theme.palette.secondary.dark
    }
}))


export const ContestCard = ({deleteState, deleteContest, contest, id, controls}: Props) => {
    const classes = useStyles()
    const dateFormat: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notesPopper, setNotesPopper] = useState(false)
    const handlePopper =(event:any)=>{
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setNotesPopper(!notesPopper)
    }
    
    return (
        <Card elevation={3} className={classes.cardRoot}>
            <Box className={classes.decorator}/>
            <Box className={classes.cardContent}>
                <Box p={1} className={classes.cardHeader}>
                    <div style={{width: "100%"}}>
                        <Link to={`/contest/` + (contest.id) + "/presentation/main"} state={{contest: contest, id: contest.id}}>
                            <Typography className={classes.cardLink} color={"primary"}
                                        variant={"h5"}>{contest.Name}</Typography>
                        </Link>
                    </div>
                    <Typography color={"textSecondary"} style={{display: "flex"}} variant={"body1"}>
                        <AccessTimeIcon alignmentBaseline={"after-edge"}/>
                        {
                            new Date(contest.StartDate).toLocaleString("ru-RU", dateFormat)
                            + " \u2013 " +
                            new Date(contest.EndDate).toLocaleString("ru-RU", dateFormat)
                        }</Typography>

                </Box>
                <CardContent className={classes.cardBody}>

                    <Box onClick={(event)=>{handlePopper(event)}} className={classes.cardInfo}>
                        <div  className="description">
                            <span>Описание</span>
                            <Typography style={{width:"400px"}} noWrap>
                                {contest.Comment}
                                <Popper onClick={(event)=>{handlePopper(event)}} id={id} open={notesPopper} anchorEl={anchorEl} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Box>
                                            <Paper  elevation={8} className={classes.paper}>{contest.Comment}</Paper>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
                            </Typography>
                        </div>
                    </Box>
                    <Box className={classes.cardInfo}>
                        <div className="status">
                            <span>Статус</span>
                            <Typography>
                                Подготовка
                            </Typography>
                        </div>
                    </Box>
                </CardContent>
            </Box>
            <Box className={classes.cardControls}>
                {controls &&
                <Tooltip title={"Личный кабинет конкурса"}>
                    <IconButton onClick={() => {
                        navigate(`contest/${contest.Id}`)
                    }}>
                        <CreateSharpIcon/>
                    </IconButton>
                </Tooltip>
                }
                <Tooltip title={"Перейти на страницу конкурса"}>
                    <IconButton onClick={() => {
                        navigate(`/contest/${contest.Id}/presentation/news`)
                    }}>
                        <OpenInNewIcon/>
                    </IconButton>
                </Tooltip>
                {deleteState &&
                <Tooltip title={"Удалить"}>
                    <IconButton onClick={() => {
                        deleteContest!(parseInt(id))
                    }}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
                }
            </Box>
        </Card>
    );
};
