# video-parser

Watch here: https://yarikleto.github.io/video-parser/

### Single page application (HTML + JavaScript(ES5) + CSS) for displaying and viewing a list of videos from youtube.com.

The application is passed a list of video identifiers (VIDEO_ID), separated by a comma or space, in the GET parameter "id".

List of VIDEO_IDs for example:

`sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ,pl-DjiO8das,CJRw18MtRPg,Wpm07-BGJnE,xf4iv4ic70M,6Q0AazVu1Tc,Xyb1fsPG-Xk,kG41zm8HGSE,RxvcH25WThg,df7PZIVe1lw,sYvH7Y16iUM,juTa0fPI22M,2KuqjW0WtZg,dKccvk36atQ,Duc3F700lgE,TI5bEf-BULU,sxyotaytAS0,UZ47aQFp2TQ,qD2yyikDcDw,O4_JNAFClFk,iJz5jURaEBc,RBbkCEHBw_I,CX11yw6YL1w`

Each VIDEO_ID is 11 characters long and can contain the characters: a-z, A-Z, 0-9, -, _.

Example request: `https://alfimois.github.io/savefrom-video-parser/?id=sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ`
