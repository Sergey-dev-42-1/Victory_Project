import {Card, CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


interface Props {
    title: string,
    content: string,
    cardImg?: {default:string},
}

const useStyles = makeStyles({
    root: {
        backgroundColor: "rgba(0,0,0,0.02)",
        maxWidth: 275,
        height: 400,

        paddingBottom: 20
    },
    title: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "4px",
        letterSpacing: 0.8,
        display: "flex",
        justifyContent: "center",
       
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        textAlign: "center",
    },
    media: {
        height: 140,
    },
});

export const FeatureCard =  ({title, content, cardImg}: Props) => {

    const classes = useStyles()
    return (
        
        <Card elevation={3} className={classes.root}>
            {cardImg && <CardMedia
                className={classes.media}
                image={cardImg.default}
                title="Функция"
            />}
            <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                    {title}
                </Typography>
                <Divider className={classes.pos}/>
                <Typography variant="h6" component="h4" className={classes.content}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )
}