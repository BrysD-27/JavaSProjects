const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=959465b9-ec55-4a51-9ebe-b836fc5c10d1'; // USE YOUR KEY HERE

async function fetchObjects() {
    const url = `${ BASE_URL }/object?${ KEY }`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
}
fetchObjects().then(x => console.log(x));

async function fetchAllCenturies() {
  const url = `${BASE_URL}/century?${KEY}&size=100sort=temporalorder`;

  if (localStorage.getItem('centuries')) {
    return JSON.parse(localStorage.getItem('centuries'));
  }

  try{
    const response = await fetch(url);
    const data = await response.json();
    const records = data.records;
    localStorage.setItem('centuries', JSON.stringify(records));
    return records;
  }  catch(error){
    console.error(error);
  } 
}

async function fetchAllClassifications() {
const url = `${BASE_URL}/classification?${KEY}&size=100sort=name`;

if (localStorage.getItem('classifications')) {
  return JSON.parse(localStorage.getItem('classifications'));
  }

try{
  const response = await fetch(url);
  const data = await response.json();
  const records = data.records;
  localStorage.setItem('classifications', JSON.stringify(records));

  return records;
  } catch(error) {
  console.error(error);
  }  
}

async function prefetchCategoryLists() {
 try {
  const [
    classifications, centuries
  ] = await Promise.all([
    fetchAllClassifications(),
    fetchAllCenturies()
  ]);

   $('.classification-count').text(`(${ classifications.length })`);

  classifications.forEach(classification => {
    const classificationElement = $(`<option value="${classification.name}">${classification.name}</option>`);
    $('#select-classification').append(classificationElement);
  });

  // This provides a clue to the user, that there are items in the dropdown
  $('.century-count').text(`(${ centuries.length }))`);

  centuries.forEach(century => {
    const centuryElement = $(`<option value="${century.name}">${century.name}</option>`);
    $('#select-century').append(centuryElement);
  });
 } catch(error) {
   console.error(error);
 }
}

function buildSearchString(){
  const classificationValue = $('#select-classification').val();
  const centuryValue = $('#select-century').val();
  const keywordValue = $('#keywords').val();

  return `${BASE_URL}/object?${KEY}&classification=${classificationValue}&century=${centuryValue}&keyword=${keywordValue}`;
}

prefetchCategoryLists();

$('#search').on('submit', async function (event) {
  onFetchStart();
  event.preventDefault();
  try {
    const url = buildSearchString();
    const encodedURL = encodeURI(url);
    const response = await fetch(encodedURL);
    const data = await response.json(); 
    console.log(data);
    updatePreview(data);
  } catch (error) {
    console.error(error);
  } finally {
    onFetchEnd();
  }
});

function onFetchStart() {
  $('#loading').addClass('active');
}

function onFetchEnd() {
  $('#loading').removeClass('active');
}

function renderPreview(record) {
  const {description, primaryimageurl, title} = record;

  const previewElement = $(`<div class="object-preview">
    <a href="#">
      <img src="${primaryimageurl}" />
      <h3>${title}</h3>
      <h3>${description}</h3>
    </a>
  </div>`);

  $('.object-preview').data('record', record);
  return previewElement;
}


function updatePreview(data) {
  const root = $('#preview');
  const {info, records} = data;
  $('.results').empty();

  if(info.next) {
    let nextBut = document.querySelector('.next');
    $(nextBut).data("keyurl", info.next);
    nextBut.removeAttribute("disabled", "");
    nextBut.setAttribute("enabled", "");
    
  } else {
    let nextBut = document.querySelector('.next');
    $('.next').data(null);
    nextBut.setAttribute("disabled", "");
  }

  if(info.prev) {
    let prevBut = document.querySelector('.previous');
    $(prevBut).data("keyurl", info.prev);
    prevBut.removeAttribute("disabled", "");
    prevBut.setAttribute("enabled", ""); 
  } else {
    let prevBut = document.querySelector('.previous');
    $('.previous').data(null);
    prevBut.setAttribute("disabled", "");
  }

  records.forEach(function(records){
    const preview = renderPreview(records);
    $('.results').append(preview);
  });
}

$('#preview .next, #preview .previous').on('click', async function () {
  onFetchStart();
  try{
    const butData = $(this).data();
    const url = butData.keyurl;
    const response = await fetch(url);
    const data = await response.json();
    updatePreview(data);
  } catch(error) {
    console.error(error);
  } finally {
    onFetchEnd();
  }
});

$('#preview').on('click', '.object-preview', function (event) {
  event.preventDefault(); // they're anchor tags, so don't follow the link
  // find the '.object-preview' element by using .closest() from the target
  // recover the record from the element using the .data('record') we attached
  // log out the record object to see the shape of the data
  let findObj = $(this).closest('.object-preview');
  let objRecord = findObj.data('record');
  $('#feature').html(renderFeature(objRecord));
  console.log(objRecord);
});

function renderFeature(record) {
  const {title, dated, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline, images, primaryimageurl} = record;

  return $(`<div class="object-feature">
  <header>
    <h3>${title}</h3>
    <h4>${dated}</h4>
  </header>
  <section class="facts">
    ${factHTML("Description", description, 'description')}
    ${factHTML("Culture", culture, 'culture')}
    ${factHTML("Style", style, 'style')}
    ${factHTML("Technique", technique, 'technique')}
    ${factHTML("Medium", medium, 'medium')}
    ${factHTML("Dimensions", dimensions, 'dimensions')}
    ${people ? people.map(displayname => {
      return factHTML('Person', displayname, 'person');
    }).join('') : ''}
    ${factHTML("Department", department, 'department')}
    ${factHTML("Division", division, 'division')}
    ${factHTML("Contact", `<a target="_blank" href=mailto:${contact}">${contact}</a>`)}
    ${factHTML("Credit Line", creditline, 'creditline')}
  </section>
  <section class="photos">
    ${photosHTML(images, primaryimageurl)}
  </section>
</div>`);
}

function searchURL(searchType, searchString) {
  return `${ BASE_URL }/object?${ KEY }&${ searchType}=${ searchString }`;
}

function factHTML(title, content, searchTerm = null) {
  if(content == '' || content == undefined){
    return '';
  } else if(searchTerm == ''){
    return `<span class="title">${title}</span>
            <span class="content">${content}</span>`
  } else {
    return `<span class="title">${title}</span>
            <span class="content"><a href="">${content}</a></span>`
  }
}

function photosHTML(images, primaryimageurl) {
  console.log(images);
  if(images && images.length > 0){
    images.map(image => {
      console.log(image)
      return `<img src=${image.baseimageurl} />`
    });
  } else if(primaryimageurl) {
    return `<img src="${baseimageurl}" />`
  } else{
    return '';
  }
}

$('#feature').on('click', 'a', async function (event) {
  if (href.startsWith('mailto')) { return; }
  const link = $(this).attr();
  event.preventDefault();
  onFetchStart();
  const response = await fetch(link);
  const data = await response.json();
  renderPreview(data);
  onFetchEnd();
});