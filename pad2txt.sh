#!/bin/bash

# VARIABLES
# ---------------------------------------------------------------------- #
  PADURL="http://titanpad.com/ep/pad/view/ro.EQT8t3mjPFH/rev.26"
  PADURL="http://titanpad.com/ep/pad/view/ro.EQT8t3mjPFH/rev.75"
  PADURL="http://titanpad.com/ep/pad/view/ro.EQT8t3mjPFH/rev.181"
  PADDUMP=dump.html
  PARSED=parsed.txt


# GET A LOCAL DUMP OF THE PAD
# ---------------------------------------------------------------------- #

  wget -O $PADDUMP "$PADURL"


# EXTRACT AND FORMAT PAD CONTENT FROM RAW HTML
# ---------------------------------------------------------------------- #

  sed -n '/padcontent/,$p' $PADDUMP | tac | \
  sed -n '/<!-- javascript -->/,$p' | tac | \
  sed ':a;N;$!ba;s/\n/ /g' | \
  sed 's/<span/\n<span/g' | \
  sed 's/<\/span>/<\/span>\n/g' | \
  grep "^<span"                                > $PARSED


# GET ALL DIFFERENT AUTHORS (BASED ON SPAN ELEMENT)
# ---------------------------------------------------------------------- #

   AUTHORSPAN="<span class=\"author"
  UNIQAUTHORS=`cat $PARSED | \
               sed "s/$AUTHORSPAN[^>]*>/&\n/" | \
               grep "$AUTHORSPAN" | \
               sort | uniq`


# ECHO AUTHORS
# ---------------------------------------------------------------------- #

#  for AUTHOR in `echo "$UNIQAUTHORS" | \
#                 cut -d "\"" -f 2 | \
#                 sed 's/ /QWERTZY/g'`
#   do
#      AUTHOR=`echo $AUTHOR | sed 's/QWERTZY/ /g'`
#      echo $AUTHOR
#  done



# FOR ALL AUTHORS: 
# IF LINE CONTAINS AUTHOR REPLACE END ELEMENT WITH AUTHOR 
# ---------------------------------------------------------------------- #
# QWERTY IS A TEMP REPLACEMENT FOR SPACES (HACK -> BETTER SOLUTION?)

  AUTHORCNT=1

  for AUTHOR in `echo "$UNIQAUTHORS" | \
                 cut -d "\"" -f 2 | \
                 sed 's/ /QWERTZY/g'`
   do
      AUTHOR=`echo $AUTHOR | sed 's/QWERTZY/ /g'`
    # IF LINE CONTAINS AUTHOR REPLACE END ELEMENT WITH AUTHOR
      sed -i "/$AUTHOR/s/<\/span>/ (AUTHOR:$AUTHORCNT)/g" $PARSED
      AUTHORCNT=`expr $AUTHORCNT + 1`
  done


# REMOVE ALL AUTHOR SPANS
# ---------------------------------------------------------------------- #

  sed -i "s/$AUTHORSPAN[^>]*>//" $PARSED       


# (COMBINE CONSECUTIVE AUTHOR LINES)
# REMOVE CONSECUTIVE AUTHOR MARKS (IN REVERSE ORDER)
# ---------------------------------------------------------------------- #
# QWERTY IS A TEMP REPLACEMENT FOR SPACES (HACK -> BETTER SOLUTION?)

  AUTHORFY="document-parsed4author.txt"
  if [ -f ${AUTHORFY}.tmp ]; then rm ${AUTHORFY}.tmp ; fi


  for LINE in `tac $PARSED | sed 's/ /QWERTY/g' | rev`
   do

      # REINSERT SPACES
      # ----------------------------------------------- #
        LINE=`echo $LINE |  sed 's/YTREWQ/ /g'`

      # AUTHOR OF CURRENT LINE
      # ----------------------------------------------- #
        AUTHORNOW=`echo $LINE | cut -d "(" -f 1`

      # IF AUTHOR OF PREVIOUS LINE IS THE SAME AS
      # FOR THE PREVIOUS LINE SET AUTHORMARK TO NOTHING
      # ----------------------------------------------- #

      if [ X$AUTHORNOW = X$AUTHORPREV ]; then
  
           AUTHORMARK=""
      else

           AUTHORMARK="("`echo $AUTHORNOW | rev`  

      fi 


      # WRITE LINE TO FILE
      # ----------------------------------------------- # 
        LINEWITHOUTAUTHOR=`echo $LINE | \
                           cut -d "(" -f 2- | rev`

        echo $LINEWITHOUTAUTHOR $AUTHORMARK >>  ${AUTHORFY}.tmp

      # SET THE AUTHOR OF CURRENT LINE AS AUTHOR
      # OF THE PREVIOUS LINE FOR THE NEXT CYLE
      # ----------------------------------------------- #

        AUTHORPREV=$AUTHORNOW

  done



# REVERSE FILE AGAIN
# ---------------------------------------------------------------------- #

  tac ${AUTHORFY}.tmp > ${AUTHORFY}
  cat ${AUTHORFY}


# CLEAN UP
# ---------------------------------------------------------------------- #
  rm $PADDUMP ${AUTHORFY} ${AUTHORFY}.tmp $PARSED


# IDEAS:
#
# THRESHOLD FOR AUTHORSHIP :
# -> IF EDIT IS SHORTER THAN CERTAIN NUMBER OF CHARACTERS 
#    DELETE THE AUTHOR INFORMATION

exit 0;


