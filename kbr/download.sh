#!/bin/bash
PARAMS=""
while (( "$#" )); do
  case "$1" in
    -s|--url)
      BASE_URL=$2
      shift 2
      ;;
    -l|--level)
      LEVEL=$2
      shift 2
      ;;
    -x|--x)
      X_LIMIT=$2
      shift 2
      ;;
    -y|--y)
      Y_LIMIT=$2
      shift 2
      ;;
    -o|--out)
      OUT=$2
      shift 2
      ;;
    -p|--page)
      PAGE_START=$2
      shift 2
      ;;
    -n|--num)
      PAGE_COUNT=$2
      shift 2
      ;;
    --) # end argument parsing
      shift
      break
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done
# set positional arguments in their proper place
eval set -- "$PARAMS"

update_url () {
  DOWNLOAD_URL=$BASE_URL"_0000-00-00_00_$(printf "%04d" $PAGE)/$LEVEL-$X-$Y.jpg"
  FOLDER="$OUT/$(printf "%04d" $PAGE)"
  FILE_TILE="$FOLDER/$(printf "%02d" $LEVEL)-$(printf "%02d" $Y)-$(printf "%02d" $X).jpg"
  LOOP=false

  if [[ ! -z "$PAGE_COUNT" ]] && [[ "$PAGE" -ge $((PAGE_START+PAGE_COUNT)) ]]; then
    LOOP=false
    return 0
  fi

  if [[ -e "$FILE_TILE" ]]; then
    LOOP=true
    return 0
  fi

  if curl --output /dev/null --silent --head --fail "$DOWNLOAD_URL" -H "$REFERER"; then
    LOOP=true
    return 0
  fi
}

[[ -z "$LEVEL" ]] && LEVEL=3
[[ -z "$OUT" ]] && OUT='.'
if [[ -z "$PAGE_START" ]]; then
  PAGE=1
  PAGE_START=1
else
  PAGE=$PAGE_START
fi

REFERER='Referer: https://viewerd.kbr.be/gallery.php'
X=0
Y=0
update_url

while [ "$LOOP" = true ]
do
  [[ ! -e "$FOLDER" ]] && mkdir "$FOLDER"

  while [[ ! -e "$FOLDER".jpg && "$LOOP" = true ]]
  do
    while [[ ! -e "$FOLDER".jpg && "$LOOP" = true ]]
    do
      # In the cases of we need to redo some pages,
      # we don't need to download tiles already there.
      if [[ ! -e "$FILE_TILE" ]]; then
        echo "downloading $DOWNLOAD_URL"
        curl "$DOWNLOAD_URL" --silent -H "$REFERER" -o "$FILE_TILE"
      fi

      X=$((X+1))
      update_url
    done
    X=0
    Y=$((Y+1))
    update_url
  done

  # In the cases of we need to redo some pages,
  # we don't need to redo pages already done.
  [[ ! -e "$FOLDER".jpg ]] && montage "$FOLDER/"*jpg -geometry +0+0 -tile "$X"x"$Y" "$FOLDER".jpg

  # Safe delete!
  # rm "$FOLDER/"*jpg
  # rm -d "$FOLDER/"

  X=0
  Y=0
  PAGE=$((PAGE+1))
  update_url
done





