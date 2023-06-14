$(document).ready(() => {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    var cartDivHTML = "";
    var totalOrderSum = 0, totalOrderCount = 0;

    if (cartItems === null)
        return

    for (let i = 0; i < cartItems.length; i++) {
        cartDivHTML += `
        <div class="col-12 row" id="cartItem${cartItems[i].bookId}">
            <div class="col-12 col-md-2 my-2">
                <img class="" src="${cartItems[i].image}" width="80" height="80" alt="Card image cap">
            </div>
            <div class="col-12 col-md-6 text-left d-flex align-items-center">
                ${cartItems[i].name}
            </div>

            <div class="col-6 col-md-2 p-2 d-flex align-items-center">
                <button id="cartMinusBtn${i}" 
                    bookId="${cartItems[i].bookId}" 
                    bookPrice="${cartItems[i].price}"
                    bookImage="${cartItems[i].image}"
                    class="btn" style="background-color: transparent!important"
                ><i class="fa fa-minus"></i></button>
                <a id="bookQuantity${cartItems[i].bookId}" class="btn product_count font-weight-bold" style="">${cartItems[i].quantity}</a>
                <button id="cartPlusBtn${i}" 
                    bookId="${cartItems[i].bookId}" 
                    bookPrice="${cartItems[i].price}"
                    bookImage="${cartItems[i].image}"
                    class="btn" style="background-color: transparent!important"
                ><i class="fa fa-plus"></i></button>
            </div>
            <div class="col-6 col-md-2 p-2 d-flex justify-content-between align-items-center">
                <input type="hidden" id="bookId" value="${cartItems[i].bookId}">
                <a id="bookPrice${cartItems[i].bookId}" class="btn product_count font-weight-bold" style="">${cartItems[i].totalPrice} ₽</a>
                <button id="cartRemoveBtn${i}" 
                    bookId="${cartItems[i].bookId}" 
                    class="btn" style="background-color: transparent!important"
                ><i class="fa fa-trash text-danger"></i></button>
            </div>
        </div>`

        totalOrderCount += cartItems[i].quantity;
        totalOrderSum += cartItems[i].totalPrice;
    }

    if (cartDivHTML !== ""){
        $("#cartDiv").after(`
            <div id="orderDiv" class="col-12 col-lg-3">
                <div class="d-flex justify-content-between my-2">
                    <div>Количество товаров:</div>
                    <div id="totalOrderCount" data-order-count="${totalOrderCount}" class="font-weight-bold">${totalOrderCount}</div>
                </div>
                <div class="d-flex justify-content-between my-2">
                    <div>Стоимость заказа:</div>
                    <div id="totalOrderSum" data-order-sum="${totalOrderSum}" class="font-weight-bold text-info">${totalOrderSum} ₽</div>
                </div>
                <div class="d-flex justify-content-between my-2">
                    <div>Стоимость доставки</div>
                    <div class="font-weight-bold text-secondary">200 ₽</div>
                </div>
                <div class="d-flex justify-content-between my-2">
                    <div>Итого без доставки</div>
                    <div id="totalOrderWithoutDeliverySum" class="font-weight-bold text-success" data-order-sum="${totalOrderSum}">${totalOrderSum} ₽</div>
                </div>
                <button id="submitOrderBtn" class="btn btn-success btn-block my-3">Оформить заказ</button>
            </div>
        `)

        $("#cartDiv").html(cartDivHTML);
    }
    else {
        $("#cartDiv").html(`
            <div class="col-12 align-self-center d-flex flex-column align-items-center">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="cart-empty__icon"><path fill="url(#cart-bag_svg__pattern0)" d="M0 0h160v160H0z"></path><defs><pattern id="cart-bag_svg__pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#cart-bag_svg__image0" transform="scale(.00407)"></use></pattern><image id="cart-bag_svg__image0" width="246" height="246" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2CAYAAADlEnrIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YzM3YjE2MC0wNTAyLWU0NDYtOGZjMC0wYWRhNmEwOTMwNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUJFMUY2QTQ1RDYxMTFFNTlEQTVGQjNEN0I1ODY5QUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJFMUY2QTM1RDYxMTFFNTlEQTVGQjNEN0I1ODY5QUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTYyZTQ0NzEtODdiZS0wNjQzLWJiYWItZTRmYTgzYWQ3YWIyIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZTUzMGViNTktZDg3MS0xMWU0LTk1YjMtZWMxNzI5NzcwYjkxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4Fd6ygAAN/ZJREFUeNrsfQmAXGWV7rl77VW9pruTTmdPICQsSYAg27Aoi6hsMqgMozD6nssoOj4d9Yk4MuO8mfExPscZFxQ3dARhBhdQCISdkLAlkISEhKyd7vRWXd213u2d81dV0km6q7fq7lvd5yM/91b1rap7//98/3fOv0qu68JUwLIs6OvrA8dxxGtJkoDuhY6E4n3R62g0CplMRiTTNMX7oVAIFEWBZDIpXhuGAbIsi9f0PoGOuVxOHP1+P6RSKXGk36Rz+gx9T39/v0g+n09ca9u2OKd7oN+ko6Zp4vp0Oi2+g470mv5Gv0l/Hwhd14+5n0AgANlsVvw2vU/X03fTOf1e8b7oGrqe8oc+Q89P90q/g/cUw9e1+LkFeGymc3w/iscY/mQNpmpMVZj8mFS6jYEJr8VLJRvPKVFGpjFlMKUwJSjhNT34+x14jOP9tOOxVVXVfXhsw/uk92zKM7qfRCIBxXN6Bnomet5wOCzKiZ6B/kbPWCwjej66lp6NjnQNHemZ6Tr6ezAYFJ+j56b3KA/oevpOyjPKW7qGyoDKt5j39Hc6p2vpb3Qt/SZdT99Fnyn+/kD7onPKfwLZAf0mXUvfXfx9+r6iTRQ/T387nj90bdGm6ZlisdiU8EsFhidABlGo1AxMjXi+DI3+dDxvwXNKzWhodAwViVL83Gh+YyTXkOEOvKeCoWbxdw/g691IoLfRoPeh4W7B4zZMh/D9/uMrZ8bUgYk9hUSmA6aFeL4GSbu2QOKVSI55RF5Ss9GSt4z3djyowlmI97WweF+o5MV7JGK/jITfhWTfiBXBJnzvbaoMuKSZ2DOByESOFUjcc5AEa/C90/F8+fEqORY1niwMociN+P6VpOzkfpK7i9iFiQj+IqanMW3Bz2XYEpjY04HIhMWYVqOxX47GvxbTomIbg9dJPE6lJ0+E0g2F17vQK9mAx8cwPY/vb2crYWJXGtagIl+BxnsBKti5eNSKRC4a/wyMQxeiV0JE/wC68w6S/Gms5B7H148UVJ3BxPaWQhVaRldjugzfuwqPZxZbRostp9ygBAMrNRlJfgGeXoDnd2AevYTnj2A+/RaPGzivmNhTZqCFuHgBGuO1qqpei6/PKkF6Rgm3Hc9X4WEVVoZfRg/nRczX+zHfHsT33uKcYmJPCpkL8fEVePgLdLdJnQPUOswELlsen4n5eia+/Drm6x8wX3+G6SF832ElZ2KXHagi85DQN6GRfRDjw6UDic6knhA192G6Bs+vQSXfhXn/UyyDn+J7eziHhofMWTCsQp+B7uH38bgNCf11jAeXsnJMspHK8kLM+zuQ4Nvw/G586+yBFSuDiT1iUqM7+C5UiP+ihh18/VeYfGxIU17R+rCS/QgS/PlUKvU7PL6Ly4SJXRLkThfSu9FY1qPr9wim97LheJPkWDZXYsX7CFa867HMruJyYmIf7+YJQ8HjZagG6/At6nK5oPg+w/Oh0gXUuIbq/WShUoaBY+mZ2DMU2Wz2UjSKR30+38NoFBcxZSrW4zofK+bfooqvwzK9hIk9Q2t6Gu6IRnAvxmp/QmJfMtgUPEbllS2W4UXpdPpRLNtf4eulxfeZ2NO84LHAQ0jk25HIm/H1jUWiM6mnTxkXXPEbqIzx+A0s8/BMI7c8kwqcWrdzudxmy7K+hoUeYBpMc+OWZZ1Gs6FrTjPLbp1J5J4RxMbCXYqF+3s8/T4W7nw2+Rmn4i14+AG66H9AWzh5JhB82hNbUZQvYc39CrpjV7CJz2wgqWnq7Mt4+jXIL3LBxK5ArMaCfAZr5zsx+bnrilEIx2ixC2pjeQ6Pq5jYFYJCI9jtmDZiegebM2MIktOwVFrh5fbp2HA63Yi9CGviP2GBfY0VmjGcABQU/Gu04AO+tYyJ7UEXyzTND+Vyudcwpr6UzZYxGqiq+mdkO2hDN08XQZArndD5g/RjmreLMTV3YTHGBLQd6hq7B4XhRwWbYmJPYWEswQMtq/OXPI2PUQaRoL7vD9NSytQtxsSeAliW9b5sNrsJC+J0NktGOWNvtKnT0LY2oo1dV6mCUXHELgwZvB1r1AcxhdkUGRMECuvuQ6J/rbjme0W1G1SY6y1rmvZLPH3/QPeJwZgQ1cvvxkLdYcvw/IOQ3/OMFbucGYwkrsfTp4qkZjAm0Uu8Acn9DJ42MbHLSOpMJrMyl8s9j+c84IQxVXZ4Nqr3C+g1nlYJCzl4+g4L0ynfmUqlnqM1vNn1ZkyxLTbj6bNI7ku9boter3quw0z8I2ZikEnN8Ai5A5j+hC+vZ2KPDX+B6T4mNMOLBEf8Ggl+KxN7FMAM+xgefsImxPA4foDpE0zskeE2rBH/g5WaUSH4DtksE7s0PovpW2wrjArDt7xGbs8Qm9xvVOl/YRthVCq50X4/xcQ+ltQ34eE/2DYYlQzHcb6NtnwLExtEC+PVmH7KMTWj0lGw4R9iunrGErsweudCrOEeYFIzphnByabPn5HEtizrZNpUjUnNmKZuOQ1iWTFllUtbW9ukqrTPR/uZQw0S+yV8+BYmNmM6ojCv+6CqqqvxvC0YDNJS2JP2+2oikZi0B8WHLK4583taxJ1JzZjO8TYK1+xMJvNbPJ4ZCAQmdSlUlcg2WcSmGgtrsfvxoc/ivbIYM4HcaPOr8UhDo6+b1N/OZrMT/iO0AkVvby/VIrRn1u1c5IyZBiQ4LYl9RygUmpT9u6XJUs6urq534wP9lpWaMRNB4obEvqa2tvbBSVHsdDo9GW54M/7ODjz1cREzZiIKGxRYfr9/MZ7vKW5YMGHEbm1tnbAvLyxpRGk7uiJLuXgZTHD3TQx/l5mmOaF7skupVGrCvjyTyZAL8jMk+Ie4SBmMI275T1Ds/rLQ9Vt5MXY8Hr/Rsqx7K2GNKAZjsuA4DhiG8aFwOPyLCSP2RPVjY43UmMvl9uKpxkXJYJzAD1vX9fl4un8ivl/t7++fkBvHmPp+VVWZ1AzG4KqtJJPJ+/F0QsZ0qFhrTMR9fwVrpHO4+BiMIRWbxnWciaT+Moard5b9+2ngSLlANY9t2yvwuJmHizIYI+MMcuUU9HDfKKtil3NfokL31s+5uBiMkSs3pnsxnVpWYpdzgAq69Z/HmmclFxeDMSrVXmma5pfxeGe54m2pXIqdSCTm483tQGKrXFQMxujgIFAYl4TD4V1lUWwM3Mf9JTRrC12JuzExqRmMMUayqNY/QD5eVA6xlcbb3UWuQyaT+XMk9S+5wYzBGB+XkNjv9/l89413UNe4R56hB6F1dXUdRNWu46JhMMbtkndWV1c3IbHNcbni3d3dY/cdsFbBiuF2JjWDUR6g11ubSCS+oarqF2jo6Zi/p6OjY8xuA6ZGJPcBmQeDMxjlVG0x1Zm4NemuOP14T0/Pb/D0Go6tGYzyxtqYfoMu+XVj5daYlda2bRoOx6RmMMrvjtPhWsuyVhcGsIw+tbe3j+mHMQZ4ClX7PCY2gzExqo2u+NN4PH8sq62oyWRy1C64pmnnhUKh8wqNZ1wKDEaZQdxCr/g8VO0/Q1I/MWrxPXz48Kh/VFGU5/FwNmc/gzHhbvkmJPma0X5uVOuKkzuACn0xqvbZ7IIzGJPikq9G1b4YT9eNqkLo6uoa7W9txLSas5zBmBTFpvB3Qy6XO3s0Ya80mrHimUzmvFQq9dRk7kHEYMx00Nhxn893rt/vf3bErvhoxopjjfEVHovCYEy+aiP37sCw+ZIRf2akjWf4xUtQqd/0RGztOgCKH5RAECSZ7o0Ln1FOIuVtyk4lAawUvjH1HmphU8vleNw6IsUeiStOKq1p2hcLNcfUZ7zmAyd1GBLb38QnVkENqExuRtlIbaVtACcLgXlLQA41gmtlPXBfErnkX8DjzSMZQy4N149NX2iaZn02m23FGkPxBLED1eAe+AOkN9wBXdskyHRmQQ2qIKvcr84Yh7tru5DrN8FXpUPNSRYE3nE7SE3vATfd7Yl7RELboVCoQdf1zmEVe7iYubAV6MfwqHiFNOSJO1gIkQXVEFxQBZ2vdkF8exwfXALVrxV9F7ZWxsgkGmFnbHAsB6qX10HdGTWgqD2Qc5EbjqfuVkGR/Rge7xwuJFZzudxwtQRN/r6VWsI9pYYYXFtpDBGqDWg8vxlCzTHoeKkTsj159ZZUCpTYbhmlbAiESltJC/SoH2qR0NGFURQNtPnuOECNt8ZqEAeRrx9FL/tO4mUpcqvBYLDkl2ENcWl/f/9cT7q4Ur6mhawL4Xlh8Nf5oPO1bojv6BUVseJXmNyMkrZDxI4tiULNaTVIbl2Q3HVc8XevoTB+nLh4Jcbbvy9J7J6enpJuOOJjnu7ikvIPbPaZoPgUaFhbD4EGPxK8C7LdWdGwJims3ozjVDplCSLXnloDkYURQWYzYeYJ7eFBlWTrhmF8FNPvS4mtWlVVNSSpUfYb+vr6rqqIASmFGtjBOigyn9TbD12bu6B3Z0L8jdWbcYxKL0aVPrWg0khyeg8qZJQ0uuGXh8PhRiT3oaHIPdwAlZtQrfVKKjh6TrPfAsVQYNY5syDQGBCNayL2ZvVmlR6o0nbe0/O6Sh8P5KSWTqdvRO5+ayh3fMhpm1QT6Lr+5zRJpOK6kKhmzmLsjWUWWRAR6k2uee9OjL1lidV7Bqq0Y7miYaz29MpU6eOITd70B1Kp1NDEHmxTvkKQvhw/dIZ3SS0N/2dSb4q9Ub0bz22AYFMAOl7uFA0kTO6ZQ2rVp0DNabUQWxRBN7YyVfo4V5xGoa3CMHoFvtwyKLFLtKxdM20KF9XbNm2ILooiuYNwcH0rpA+nBeEZ0xdEal+ND2Zf2ARaRBONY15t8R4jwa9H/g5K7EGbu4trLk2nmlsMyctYkMPCljHWZrWeAUASy0ENcqYDdtoaxwp/3gR60+8rLHx4QlIHc7WRBLSx3qnTJQNkRRKxdaI1BcmeHNg5J9+IxpjenjiWuYOeWs/b/RCIqBCdEwRXAxFvTxOssCxrhW3bJ6i2Go1GT7gag/Kry7Gn19RXaUhqLV9Nx/clIdmVBS2kgi1zy/hMIreiy9DfkRHDkGPNQTGnwEEVr3SXnGJtXdff4/f7TyC2TJO4j0+IS6eFUmOBUstn954+SNJgFV0GXtJpBpIbi1w1FEijDXSjepNiE9mnQ+WOHvflRPDjkxqPx493w2erqnpmpRNAQaW20OWO7+2DXNJCUnND2UwHNZZm+3JI7gRUtYREazmFZRX7PIpCQnwWcrgZybz/GFc8EAgcczFeeCFttFfRBYi1sYlk7kH328pa+JpJzSjahgJm2oau3X2C3HpQrVhyF9rHVMMwLpZl+Z5jiH38JBCMr9+ZzWYr02WloaMa1sqJHMbU/WCTy6UxqRknenMOkpnccoq5fVENbIq53cokN3rYFyOPjyV2IpEY+FpHtb6wEtc1o4pI1iQRR8UPJMXYUkXj9dkYg4MaVSnW7tnTD9E5AQjU+ESDWqWNsiSumqZ5Xk9PD60jfqTFWy4G24X+rxVIkLkVR2o5T+r+wxl0v/Nj36nlk8EoSQqas4//evcnob89LWyoErtBkbcteDhl4N5dqt/vP3IBMn8tdXNVjBtOg4iU/IMkDqYEsamwiOgMxojIjfbjorkkWpMYujkQbQqI13YFCXdh7fFzkbuvHvVINA2KCWX9zIpxRY70UUuij7qvWOMyqRlj8vgUodpkS2RBsl45Yx0KxD4HhZlWOxLpmO4uInalxNeKoYs+6p49fZCJF7qzmNOMMZMDhA0luzJCuWP1LsiGVhHcLjSgnYWpMPXpWMWej8xf6nmZxqRg9ECZ37UnDtleE1RDZlIzysDu/EAW6uvu2p0AO5e3taLdeRwLbNteWFTsI/KMUr7W+6SWQQnXgHlwO/Ruugcs08991Izye4PolltWEOIbfwZm6zZhc/kZJN4mt6Ioa46E1ZFIBCjhizWF4aTeJLWkghKpguy+jRB/7HNgJfZibRodq+8CPFicUZIk/gg4fXuh57G/ETZHtkc26FW7Ie7qur6K5n5QkqkfmxLK9zJPrm1GJJQNUEJRyOz4E8Sf+CI4ZhKUQD2td8MWyBhJ9DaGz9H03npw0dZ60ebI9sgGyRa9uGY9cdc0zeVFPqsFlSZGL/NcN5frgKQFQPYFILn5V9C/6TsYBPnwdU1+1wAGY5iYeVxmgh+W/TXgZHuh9+mvg53ugeCKG8DJyEj4lFjb3lsa6NIUTjFQpbjx/Rx8Y57nSG1E0PvRoW/jd5HYP8XKMgaSHmRSMybVDmUjCi664X0v3oWk7oHwqv8BjqyCm014jdyzUbmJx2+JnUBQqU/2WjeXhMrsZDPQ98w/Q3rHg+gW1YGLbpBrjnOeOD4nDfq30hbIXD9Uhis9Rjg5C9RsfiFD2r5nzLIP6NXKfgBNgr6X7garH8m95pMgo426ds5rqk2e91tiXfFMJrMSE3iH3NTvEAJ3392gpx8G/7IlGCyoA2Ib2vXToT6vUXdzUbgRjKrgLAgf2bdpci1UGoNRu0zssRk5yLqCikvbU2mj/bDY1VUSduccLTunDuz+R8BtbQCY/2G0wR6vlc8y9L5/JxQbTxZ7Lb6mvFTlHjAaQgCGMUjeUSWkjqmwJUXmnTlnSoyNau2SWo/avtFOpGIX14DPSlhBhIJgo206HvP4CiPQFosBK7SuOCr1HC+OD3clHWyT7rjMrd+WnV93nMHSXxJD2IiJlQUY3ntCEi1JaqEWcrGNLr6YwwXPYEyD6st15wt/NhqNoq8Lc9ktZTBGo/7eHMNMio2hdUxOp9NN+DrMi/wxGNMCBrrijXI2m53PecFgjFoaC6LtPU8Xw+tmmVYl5VJiMKZLfSPR8PAmas+v4exgMKYHaIi4z+erk13XreL4msGYHih0edWiOy5XcYs4gzE9QH3Y2Wy2llzxas4OBmO08O4SYqjYMSY2gzH9ECFiV3E+MBjTjNgYX/s4HxiM0fq7nr67ACm2xqXEYEwrZvtpgIrOhcRgTCv4SbGZ2AzG9FJsjYnNYEwzuK4rU+MZE5vBmE6+hCTxXrMMxtjccG83i1PjWY4LisGYVq64RYrNxGYwRu/vetkVd5jYDMb0g0mNZ0xsBmNMcbZnkSbFNrmQRliOPG2d878ykFbRH09zPgwNxaeAJEvg2vk565KSP+d1ySeHzIpRyH/LFa85/0eEFG2l0cP5cBxo515NBlmXIX04DcnWFFhJUxiWFtIh2BQAX61PGFfR4Bhlzn+ddmuRINWehlRbupD/EuhhDYKzg2DUGGBnOP+HQIKJPZhRGTJtQwIdmzogviMOds49sqkibT3Us1WB2LIY1KyoBld2wck5bFzlzn/M0sMvdkDvWwmwTedo/qNaq1t7oHp5NVSfHANHwvw3pyL/PV3gvUTsbramAcWFrh65fm3Pt0McDUgNaajSyjF76hGRDyPpHVTsujV1+Bne2bds+a/mg+m259ugd0cvaKjQmqEem/9ZB9peaBceU92qWnBsZ0bvW3g8HMfplW3b7ubFDAfE1H5FqET8zV7QIwa65HlSu1ZOJCjs4EguYTcSP7G7D+NwlTOuTGpNbRrxN+NYBpj/UR3E4EjXHZD/IHbP1LHC7drSBX17+0Cd1Pz37i4ghMIqpZ20mGGcFzMsiAHaEMVtid0JEd9JqoLqkIJs1wF097KYcnjeKt6TVVWs4UzXClecB+eWRa2tpAV9e7CyxApVUhQsj37M84PgIKkdM5M/z2WwclUFwRJYCYuGzUkXJ89u8UMjzzqoVbyLTSoPGYmc6cmC2WeCYmhgJjrQgHww+8pPQWTJ2YL5iR0vQPv6n4LZ343qHoNcIieSETMwFueW2nHlvyZDujudz3+/Brnew6AGIjDnPZ+D8OI16GNa0LvtOWh/8ufgYkWrGlG8BvO/L4fhkobEZ4EqrFLaoaJ0H6AXDBCq65i2aLix03E0rggs/ti/QbBl5ZFLwotWQ2TRGnjrh3+NypFEY/TnG29YscviMVG87KACu9ke0KJ1sORj/w7+piVH83/xWVgGq+Ctuz+D+Z4CSQsIj0ma7Pz3aPhK3jd64a2yYRh72KQKmeK4oGD8DLIDVjoFc6/70jGkPmJcS86ChktuQWWJC5edumbos4zx5j8IF1xWXAx3stBy/f8+htRFRE8+Hxou+jCqdSdem4+5XXaWBsbZ++VAIHAQz/s4ziZPzwE9ooPqs0GvaoGqFRcNeW30lAux1vajqqjiM0K1GePLf8xDajBTDBP02kUQPekdQ15btfJijMGDoIVl0ZApWsY5xiZkHMc5JPf29ibxxT5uGQfhgpP6RhYE0bhCJVVYAg0Unx+vDQnV5u6WMii25YpW8XCLH48RihhLXKziNT6ILo7mvWLO/yL2aprWqyK7ySffj8ReznmSbxUPz4+CKxlgpTKgG4OvzuzaNtScWgvhuUHxGUZ5RJDyMrIwAlpVlRiYoiqDB89WJg01K6sgNDsIFg8vHYi36X9yMIjujKYdYFe8SFgX7UuC8CJUYv/QLTJ6dQCql9eBa9o8OKXM+U9xc2RRVaFLa6j8V6DqpGg+BJp0L9y7XV0o1HtN0wQZSU1v7GRiH1UN15FEnylI1pCXUWs4oKo7ls3DScuc/45piryVS7R0u5DFuNrKh0vSFN2o1ypFGsjjum8RwdV4PE6u+BZZ5v6aozWfjMqRQQNLAxhDXKQQsclNZzew/BaK4SHlbwlY2X5BbFnhWvUYwZHl7eKo6zqoqvoGZ8nxsm0jsfuGvkLxgaSF8Tqezl7+7Jcxb2MlL3HMfuS/CZPfge1dxS5gmyA2+eOYDqKEv80WVXTzxEwPMNPdJYtV1qJ542KUNfeJrLJRehNYJ9eDzlJOtIcwjrji1Fa2VwxSQbUmxbaLEs7Iu+KOnQUzU3q0reyvBx5yNhFKKCGx60teZee6kf/yFPZySR60W2mzoigWjSSVw+EwUEJyb6eZIQzIt3qiEjuZjpKXKf7ZU+gKTlfZsTDM8YPsmzU0qZHNdrYLFM2Y2vrHQ+3NxF0Mq7dFo1GgpPb19RVlfCOPGS+6NEhaVQcr3VZykh4RW5JpIxWHlbtceW9n0BNqBKUEsc1sBuxUG4qRn5sui7aI3MWQelMikch7k4UmcpLxFzh7jkLTA2CmWsHMDd3lpQTmoLI0oMjwsnHlJLbiawRJDQ55jZU+jDF2N03Hm9KmAK9540jsjdlslmZ3gWxZFlDCN99GgnOcXYyfFQOcbDtk+1uH9sbQ+IjcZIyM8vm3Smh+yatyfXtAcpJ0JWfZ0fh6l6Zpu6mXi5Ici8WgmPCNjTTElEFLnskgWX2Q7d1V8jo1vBTyU4u4dbYsMiipmKfLSl5FZSI75CVNFbGlfDuMR2JsGoOCwrwBw2o3mUwCpSOKTQlJvYEngxTjbAVUKQeZ3rdKEzu6HG0xIBp9GOPMcyuFbngDqJHFJT3gXGI3hkp+nvdxxFZFKP0cjSKlWFu0iqdSKSgm27afZ2IXDcgF3R+CXHwr2G4pxV4ESnA+GmWSM22cKujaSST1Mqwow0NelervAbt/F5ZNBKZ2GLR3eEJeNqZnCl3XItFum1BMiC2Y9rKR5VvGdSMETmovJHsOlChfBbTYSjTKFLvj43XDMdPV6jNKXpXq3IqS3YGqxNu6D8AedMffONaTjEYHvjZRuddns9mbeew4xS46yPYh6G9/GSLVc4a8Tq9dC5kDD+bdcYkbdMZEa6wYqZtLr15Vmtgdr4Km2uCI7kV2xkmtdV1/OhgMHhMLyv39/TAw5XK5P7E7Xsg0V4KAT4dkx8aS1ynhxVhDngyOGWfVHqsbbvaCVrWqpBtuWTaku16BYCgG3MZbyLn8qqTrMpkMDEwqtaAdq1LyeqwBaAfOGe/rUG0YCFdB1+HXIZnogGCkbmjVrv8zMLs2soqMSa4tWrgMjIaLSl7Wc+g1cNN7QK9pAsvmfC4IsIVivA7TMX9T6+rqjost3dZ0Ov2iaZrnznR3nExH0/ygWgega+96CK64vgSxz4fMvvvAyR1G1YkywUeh1jShQ6s6DdTISSWv7D3wJPg1Mz8wZcqHP0+9Z0bDSDVNewHd8BMageRCi9qRVBiJ9igbXCHz0OULhyOQOPhk6WLGeNxougyNNMGZNqra0xHj8o2mq0pelsumIXX4BYhEa8Wikx6oj7yChwc2gBeT2tvbe2LMqCgPYLqDV1WhWtERxnR49xboPPgq1M4+bchrjabLIXPwIXBzvSBpEVbt4X1JcLKdoMZOBb327JKXHt61DuTsAfAFlkBuyleE9cZm3dRfjS74Q9RVfYJik7t9fEJCv47pVW5EK2SSqkHYL8HhHQ8No9o+8M99f6ERjUk9fCOGLdTa33LDsJd273kYYtGwaND0TJw21dnnOJtVVX3d5/PB8ekEV3xAup8tLw/LtKG6thFSbU9Df8++ktcajZeBGj1FKBHP+CpZC2IeHQat9hzQqleXvLRz30Yw45shWlUPPLX4GDxYnMR1fJIHe7MQaz/A+VaoGTFPDF8Agloa9m/55bBuWmDhrUKNXDcL3P01eB7RjDhJNiCw4MPDXt36xn9CNKSBgp4TR4fHKPZ9VNENllTq8xrU03DdbYFA4CVd11fxxJB8C2Rt/WzYve9RSPbcCMGquUNeSyPRjDlXQXb/AyAFm9krH8woUa0DC24BJdhS8rqugy9DpnMDzF3cIjwnD9VNUxcF5Pfn2hSJRIZcq1DGP8JgiUakGYbxKyZ1gdiOC8FQCIJGDva8/KNhrw8s+AjIofl5l5xXWTnBBadwxd9y47CX73/1HohFaCqiITwnRp7YmqbdW5zwMViSi0upDJZQrX+OSpXjrCyqtgMNjXOgd/86iB96tbT9Kn4ILb2tsGk7jyM/6oL3I7c1zJvPDFvhte96HDIdG6F+1mwx6sxrzzKFyCF5f1mifQzUrq6SC/a1oeRTU/B1bJR5Ygf8flQQA3a9+F1Y9d7vl7yepnSSu5nc+R1Q/E1irvHM9ctp6KMJTq4LQss+D0poQem8tjKw9+UfQm1tFRiaClmTG82OuNmy/Id0Ot1Wqjtara4uvcyraZrf6+/vv44nhRyNtRubZsO2ra+KhrTmFaXdSV/zNWAn90Km9XditZUZ7ECCkz6E+XEdGI2XD3v1npfvATe1C+pbTgbT4nBwoP2FQqHv0SopJYlNEz+G8ecfw7RHkqR5PGAlH2sbmoLkboI9L90NNc3nQCBWugEouPTTYGNcaXVvAjkwG2Zc064kgZ06CHrtORBc/PFhL+/r2AYHX78X5s9txnhRQnHxIrGlKchGMeFjb19f3yPDCa1cXCNpqGQYBvj9/h9y/+FRWKggdbU1ENCysP2pb46owSi8/CugRJahgdMaajPJ+5HBTreCFj0JQsu/NAJhdzBP/wGiQQWqY1EPxtZTq9aBQOB7qNjEyZJJJuIOlzRN+x7WFpzDxQwWiuvA3JZ50Nf2IuzZ9L3hua0GIbzy70ANL0aX9KBnd2wsr8TI4lmV4CIIr/g6SEpg2I+89fxdkOnZCs1z56I6OdxvfZymqKr6fRpZNhyx1e7u7pG4ADSM6h5Mt3De5p0wUu1QQIPm5hbYvemHEJm1HKqbzy2tXVoMIqf+PSQ2fxWsxBv5DQdgOu7anq+07NQBUCNLkdTfGHYvLkLn24/D3td+AYsWLgCfrkCOG8yOtR9Z/lkqleo6fqr1oNeWajIvJnIB0Lf/R46xjwXFfvV1MaiuroI3Hrsd0ol9w5u8FoXIad8EveYcsJP7CosgStOL1K6NpN4nhopGTv1HjPeGJ3WqZxdsfeLrUF9fB7XVYW4wOz5CyY8I/Sfi4kg4q6LPPtLv3olf+ohlWZfx5JA8nPyYXJg3dzZs3b4DNj/8WVh19Y9B1cOlTV/xo1v+dUju/DfI7H8Q46EqdNVD+SmMFe56U589DcrxNV0lGg1HMjjHyvbC5j9+HnTFgrlzGjFfHWAROZbU6II/qijKthGr+0hi7GLCL/4Gj0Q7zihtB3QNYOGChZDu3QOv//FzKFgjG9MTXPwJCC77jBhX7qTbwSvTAcccT9NeZ3YaAos/js9124hITXn1+h//BrKJ/bBgwQI0YKiA1VGkSW0jIc4h924vNmaPJI0oxh6AZzVN24iKvYZr1KOg+cGRoAoLFy6FnTs2olv+BTjlXd8aEUl9Te8GNXwSpN76Lpjx19BtrSmsU+5UDKHBzuC/wyKeDi7+n6BGV4z441sf+1voPrgJliw9GUIBVcTV7A8e075FsfUL8Xj8+cL64SNT7FLjTY9PtF4x4guc3YOQ27KhJmZAy/yl0L57PWx99PMjJqcaXohx9/8R48vzAzlaK2B3EUk8n5Npw1tFlW75IERO/9YoSO0iqb8Abbseh3kLlkJ11MC4uoIayyZJ1wqx9d/SZgCk2HQcSVJH0sJ23A894ff7n8UfeQer9sB8ybeUN9QFwHaXwL6d67BAPgsnX/xNkFXfCHiigL/lA6DXvgPSe38JZudz+J0WKni1x4aiUmXj5DfFQ2JTA5l/7o1ildYR5xW639se/xIcwjxqnrcYGmoDIu/YnAYF7c6zfrQ74arUJzbaGgRrhP+Fx2c5z09sTJMw5p6N5HaR3Ad3PwNW9pNw8iV/D3qgfkTfQdMYQyd/EczuTZBp/S0eX8UvzoGkxwpb9k5l7WXhrcTzhoNE9jVdCXr9haP6CjMTh23rvggd+zbC7JbFMLs+KMbg88ytE11wiq3T6fQXRuOCHyH2rFmzxvK7z/X09Ky3bftCHkN+LGjIKWFOfQALYzEc2LcZNv/+47D0gq9CuH7liL+HlJCS2f0SZNvXgdnzMtjpQ6j+/vza25O1MQG1UNspcMw+kLUw3tMqMGZdDHrd+aNuQEp274A3n/gaxDt2QnPLIiR1AI3XPZJnjGMbzJBbTxqG8SSdj5rYY/3hYDD4+d7e3o1cBIOTm0x1dr0PVHkR7N+/DzY//BlYdPanYdbS947qu4hIlOzUfsh1PANm14tiUolj9SG3fWJEm0SuermILrqaLBE3iymWil9MXjEarxA7nozG5R6Izt2Pws5n/xmymT6YO38xNNYYlU3qCW4VJ5UOhUK3Ubw8FoyZ2KqqbkK/n9ZF4ymdg9a4rgiLG2p9oKnzYN+Bdtj25J3Q37Ud5q35FChaYFTfpwSaxcIE/rk3gJnYClZ8C1i9b4iBIC66xw6qqiShESiGmO8stpgVS9HKcGIjnFvoJ3YKy/8ikZ2s2OebiCyhMquhhWLaqYZJja0U74/NQB3Yu+nfYO+rv0DFD8C8+fOhrkpH99vN5xFjUFKjWv8aOfbKWNux1Hg8PuYfx/QpPL0a3QTesGqImNsUreUa6FoD7Dvkgz2v/QoS7Vtg/lmfhljTmjEohYxkO0Uk8RvZLrD7d4KV3Cda0510m2jYIvfZdUw8ImFFC7uTb+Gjfb+puJD8oiJAxaeRYbJvlpgzTsNclchSPDbCeFvl+zvegN0bvg0d+1+EUKwJmhurIRbWRJ5wSF2SWy6GubcNs1ZCaWIfvzXIaIJ7RBuq9p14/CoXx1CFlO/nDlM/d3M1tPp80Hn4bdjy8F/D7OXXwdzTbwHViI35+2WjRiSt5ui63ILUpOIYF9PWtGLAjBi6mt9YnhSd+sopVqfx66LfvIx1s4sewP5XfwQHNv8CMtkM1DYshDn1QfD7aIN2u8JHxk/83aNS/wPyq3U8vU7SeLussGYh1T+IN1JfvkfDSkOrAmn/t0HqfJj2z5kWJFdVWTC9oycLbYd7Id13CKK1aPSn/gXMWvKeafGMnXsehwOv3QPdrVvACNbBrPpqmFXtQ9dSmibjv/EZzF5wm24Gt/5aPO8ub7Xhuu3V1dVzkE/WuGxtuIUWho8lHQvTJykm4DHkpUF9tWTgs2p8EPSr0NYVhJ6uw7DtiTvg8M7fQcNJ10HdgndW5LP1HHgeDm39NXTuexZDEA2q6xdAQ60fIiFNxNM8qWNk4a1pmh9HobTG29ukjrXVbaBLHgwG70ulUrTj38VM7uEb1XK04ikSe35TEKKh2dDRnYLO1teh59BmaH/zv6B+0ZVQu+BSkCtgc/fufU9B+47fQfeBFyCXzUIw0gC11UGoienCQ6EZcBxOj4zUyMVHw+HwA4XZlOMj9mhHtAx1U3gzt6By78D4QOcRacPDLKh3XZUh4u+usA96etPQeeA16Gl9BQ5tux9qWi6AmnkXgT8611P3nkt1QNee9WIH0t62zaQy4AvVQmNdEGpjBgR8Sl6lTVbp0Xi+yJuPFoeEjjvs27t3b7lqnL1Y2/wtnv4LF9Po1FtDZZtd7xctxj0JPyT6s9Db+TbE299Agj8AkYaVEGs6E6INZ4AvMjULIubSXdDXvhniBzdA/NAmSMYPoBKr4A/WQE2dAVURXSw8UWwsZIzO68X0lWQyuWe0Q7yHJDatH14uoPrTlKYPYTqdi2vkIHWj5DcUCNSrUBPVId5nQF/SBNpJkcZUd+x+AlWxHkK1yyBUtxwi9SvAjyTX/DUTc09mGlLxt8Vosb72LdDXuRXSiYNg5rKgGhEIRZsgFNSwMtKFQlOfOcfRYxbFV9HT/cdyjuJUCzO2ylLrFFZvuAnPX+fiGj3y85Bd0HVZNDzVRA3oT/uQ4GFIZUzIZNKQ3PUkdLz9JKiaD3zhRnTTW/DYBIHYfDBCDaD5YpiqQdVDICnaMAblIIGTYKbjmLpQlTuRzHshk9iHJD4A6d79SOSkGMut6kHw+ashVq2J6ZVhVGdDV0QYVrxvxpi58wEidTnC4iPEzmaz5b7JN/Amv4Tp77nIxqHgSBRZkYSLS6qYzdmQTPshlY0gwS18bUEy0S5cdorV8R9erwk11ZHcihbE5MP3MKl6fjQaLV9rm+CIlAXHSgllNjMJTD34u1kxEI2GeSqqAZoRgmA4BD7yJPyqaPCjtcjo9yiMYIUef9sU8oSmZG4r93eXndgFcv+DYRhXoDdwLhff+GLw4rBLXZORYAZUgyEapYjomWwQMnikmJZIlt9p0YT+3lYkLg0TLYw4G7yUkOxEUlXs/61oIVT6qPgdivlJjYnQdKT3ZPLI3Pz92Barc3kqcPv5TCbzzYnoSVJpA76JANZC1+dyub1YK+lchGUwggETJmgRfWqoCgfzrnae1K5YponOLcs9cj0RUQz/PULnwqoceKKQ0uN3qUqezCqdi6Ms5jgIB9txj3gQjLKKnxkIBK6fqPX61VgsNlH33maa5k144//JUzsnQMkHEI3UVNEkoa5iOa4igyE/x0PQegCzi+QW5HWLbmH+OrFghM0u9kS74OjN3hQKhQ5O1G+Me+RZKSCxf42HK9CIbua+7QkkulskrjuIww3HzuVwjxoXY1yaOx4X/EeWZf3nRN6d2tnZOZHuBtVMf4mnqxVFWT66THMLcsIj2calDoPznTFl3pazNZ1O30JtW2OdWTkiYtfXT9wEi+KSLpjeiQ/zFr7285BTxvRQamcsXMgFg8HLaAueiV7GezQbBowHrUjsa/Fh/lDOvjoGY8r8oFGGMkRkJPf1SOr9k3GHk9KqVRjg/jCmUc3bltiHZHg7yBm5gqrqV3Vdf2iyNtyYFGKT+x0Ohyn9nW3b93HDDWOmELtg67+OxWJ/Rz1Qk9VDNKn9UIXFz9+Px+eGDWOK5OeQnFGhrrgYbmtZG/B4w2S3LU1VB/O78WF3l9fZYTC8o9iF4aL7MKa+ivbSmmwvVZ3MH6OGs+rqanLNe7AmuzKZTL6C5z6mNqPySO0MR+xMMBi8HOPqjqm4w0lVbHJHxL5Cqkr7EG2nbrBhcod9cYZ3uS2VtPVLUci2TtXtTdlYz8LuBk/j6Xu5MY1ReXCGdMEx0a4Qz0ylXXthEPdDmAEfPDETmOwMr6r10PPP0Y4/TDY91QOxPDE7AzPhXjx8lC2GUdl8dz+BtnyPF+7FM9OuMEN+gIfbWLUZlcHiE1xxst3veuX2VI9l110FNt8lyM7mw/AcChOUBsTYqNSfwcO/eukuvThR+l8xhPkrMYeYJ4wwvExvMU7F/bjXSO1VYhN+iBl2E+3+CK7J2s3wFqUdWjMuQ8T+CL7x7168S28Sm3aEtFM/d43Gj7hqDYCdYnIzvEFqskUtCuCbezO49o+9eqfeXbPIyYBkNP7YrbnoekcN2+Ck2a4YUyo2rhkHW/I5bs0l18m+hp+CkwMm9phqx34Ave5+re4dF0lqtCdPbm4pZ0w20OaQ1Gpocdxo/vOLXDX6G2GbHvYiPb7KoCSUW1HUp+zAsrWOMWc72EnaAJpdc8bk2B/ZmtUPllLzptp09Vp/bOmTbrbT8/ZXEcuHunaW/vemGzzjLCe48k/g0kbuOSY3Y4JJnc3bWfi0P0J0zZloh9sdJDm55V6HXDGZTC2RTjahRC54lxI56zuOY0HeNWdyMyYmDHStHMi1F/w/bc67LgMrk8jH1JVhb3JFZbZrguJkQdLnfAqqzroV1HA+DgeeBcYok42RLRGp1WqwI+d/VAo0/7Us5dBhrCwPUa60jKel8h3MeE2bdbcWOPNsW5+1CyzaetRicjPGKRyWILWj1OzSW65ZK4cX/sDN9eS3SqqwwVKVu0WHkwLJcTY4kbVnuLE1D4GF8ZDFrjljLJxGmyFxsDPghM76bzu09nRZkV+QKjjUq+C9d6iGzVCZJCCw7L126IzbwIiAxK45Y5Sut2QmAPQqsGNrP+sETn6fBFJfflBU5UKu+IJB98nNxkGtmnOX1nzeaktpfolqXuomY3IzStoO2YidBkub94o+94o1atX8/yu6stzKD+umz2556DZJkvSSFVhxphs+7dsgB0H0ebN6MwZRadHoqgTBiaz6th1etQZkddN0Gro8vbbBFF1gScc15n/aCa+9FHxN20UXBfVHMrkZRZV2suD6mre71edeIgUXfBqsPtvLw0OZ2AJuvn9b1h9zAytXuYGT/smR/eBSHCXm0DLBZ6ZKO2gDfeAoIUCP7p/dyOmrQNLXSUKlp98w5em7cTXGSZKdSdlG/f9yoqvPUWKnbHCPDGrh8eYzB4WKHstejS19wa069x22b+7nkdCp/JTg6Ql52heqlQRJ8z9vNF98thRe/TlXiXUId8zNsc1Pdzj5LlBXremwA2tu0+ecuVY29Odo7Pd0r9zl6V+6+RFrooDl2LfU2WefIlWt/I7r+vKNaw6POZ9+cXQuP3pMDoJct+a72uy1pzhS9C7XSomhyTOhvOWZU+AuUMEqOhwG35xPOf7Tzgb/ksdcSQXX7gPJdZgTlU5p1xZl6UoKgH/ZY25k7VqILPqEotqH84OXZg7kmVXyEha8LVbBcO3UBrnmvEt9LbdeI2mzN9hgF+JvJnjFKTSWnYTel4P/SVrzBmPurVdT2bpW5gVyu13aunaGrZ8nz1hjEA0nOdB8TQ/KoVVnO6GVN7p600u0rKzkpApzvhnedsLs/EhDJK7tn/+KGT3rAwqWpWY0/heV7Uye2ivPXKuQxNrQwnVDIsta5FdOYOlq03/aBx2j5RWX/uymmeCeBJYbKbFtEaFftmLnftCOrj5DUqO/BCeJ7/cX1v2euW0nKhtJofCdHNb+GKMp4Xuzvjn3Gtme96u5XZ+0nM7zJBsJjrE4+nmcXVPK51x+CLFkgBI96Rk5tPDbadN3n4v6JKMr7jrFgUjcGCqztRxHczeDnl0aVKXq14recr7rX3QpBBbf7yoBoeySaEXngS6TV+k6YuSga1IrdwAgdNJvHN+ydymx5eepsbn3Qa4vHzoNrKQZrNiDGRPN+nbJmKgxTVUfg8DcxxTfvJWQ677Zyu75gGQnGgTBhYpzFk5M/GyKQSUumqirVrWpDct+ISm1PzFzuS2Q6ci74maowOXi7hwMJvaIDYy6UJKgKHWbQZ/7uawi3+7POdfadseHbDN+CbXGog8PkqTjUeH8GmdeC1eb+pqVEMih+Y+r/tm/yKQz9ymxJX1SNgtmsqsw+4rBxC6DirtkTKTSjtmvSrGfmHLwJ3J9+gzFSV1rdyffA27HKWJEm1AQhUk+SjILxZX9AFrsdTV6+n87SvQBJ9f+suGvA0jtEuO8wZF42ycm9gTaoptDW7RB9UkvK0r9y3K66ssZ2HuxZCXeh276xZLdd1K+IYfsUGZ3/YQMRFVGV1uiJh6aoKPVbHPV2vWuEvmN4VPXKdFTwLYyYCd3IO8jnF9M7EkVcTQ6R8TitJILKMY6NM51rhxVlKB+nmz3XwvZ9rMcO7OGGndok0Exuo1a1qWZ1HLrFnavy1EO4KMrohFMViIbHa3+BVsLPCBLyjMu+K18XN2HvE+IvK2EZX6Z2DPFpXSytqtUrVcV/3pZ8UHGzq1WXPNc1+w9H2PHC8FOVImBFWALewcRm1Mr+3QxYmrFlvNz4CUaA2DkwxK9oUeR9PW2Xvuc47pP+pSmjTlZhZyUBtmKw9EGMHa1mdielXKz0AiUJY3aBFp4ky4H7sqAPsuW5MWy1XMV5DoWoCuKbjsSnfSc+tHpc3KBCK7rcWV384NApMJuGXj/LnojkqyJSsrVGxMS6OtcLbLTkiMPaar6lia77TaRXsTLNHyXrufdVJnYlUhyMR/YRJ6Sorvtrq+hHd33ZyylBXyheK0a2N+Q6bjgcgMOLbBd5zTH7j9DspN63tblPAGIQIIwakHVCso2ocQvuNBHupHyY7JFAyJVPNTQVehqctWoKanBl/DuXs1Jc982ap582M7Ob3dSSw+DdBgcJYqf6xKuuFBzHgfAxJ52KIyeklwy8/5O2TA7bdf/uhZopv5asBJbGkCNRCWt/gIpc3AJXlSDpD4DrORcyUkGUB31PKlpOKwhJrXIai9+p3qUgCI2lQacD8Zb52glMeBcrNxOM6HUCPLXd+RvrqTkJLkqA2por+NkN0kudENw4S47G39KctLdanTFIc1sg3QK42efiRFJIr8MESqyxHPfmdgzKy5Hl9WWkUxmfjgkLdPj5tpACbSBHHxTqKFvXn4/5tTuiGQ7Or6e77rGCjATDYq8PSBrOdVKLp8nKZk5SD+M360IegiG5DoKniuua5FMHukkcguElxQFmazZriRbWDNgzKDR6n5xx4U2rbrxLSfblrUdSLlKXbvqi22F9J6druOaUuikXtfsASm1W/Q1g0z3Hc/PmKNwgp7Fphibu/umEv9fgAEA4U5VqF1K3y0AAAAASUVORK5CYII="></image></defs></svg>
                <h3 class="text-center">Ваша корзина пока пуста!</h3>
                <p class="text-center">Воспользуйтесь нашим <a href="/catalog" class="text-info" style="text-decoration:none;">каталогом</a>, чтобы её заполнить.</p>
            </div>
        `);
    }
    $(document).on("click", "button[id^='cartPlusBtn']", (event) => {
        let bookId = event.currentTarget.attributes['bookId'].value;
        let bookPrice = parseInt(event.currentTarget.attributes['bookPrice'].value);

        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        let bookIndex = -1

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].bookId == bookId) {
                bookIndex = i;
                break;
            }
        }

        if (bookIndex === -1)
            return
        cartItems[bookIndex].quantity += 1
        cartItems[bookIndex].totalPrice += bookPrice

        $(`a[id^='bookQuantity${bookId}']`).html(cartItems[bookIndex].quantity);
        $(`a[id^='bookPrice${bookId}']`).html(cartItems[bookIndex].totalPrice + ' ₽');

        let currentOrderCount = parseInt($("#totalOrderCount").attr('data-order-count'));
        currentOrderCount += 1;

        $("#totalOrderCount").attr('data-order-count', currentOrderCount);
        $("#totalOrderCount").html(currentOrderCount);

        let currentOrderSum = parseInt($("#totalOrderSum").attr('data-order-sum'));
        currentOrderSum += bookPrice;

        $("#totalOrderSum").attr('data-order-sum', currentOrderSum);
        $("#totalOrderSum").html(`${currentOrderSum} ₽`);

        $("#totalOrderWithoutDeliverySum").attr('data-order-sum', currentOrderSum);
        $("#totalOrderWithoutDeliverySum").html(`${currentOrderSum} ₽`);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });

    $(document).on("click", "button[id^='cartMinusBtn']", (event) => {
        let bookId = event.currentTarget.attributes['bookId'].value;
        let bookPrice = parseInt(event.currentTarget.attributes['bookPrice'].value);

        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        let bookIndex = -1

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].bookId == bookId) {
                bookIndex = i;
                break;
            }
        }

        if (bookIndex === -1)
            return

        if (cartItems[bookIndex].quantity > 1 && cartItems[bookIndex].price > 1){
            cartItems[bookIndex].quantity -= 1
            cartItems[bookIndex].totalPrice -= bookPrice
            $(`a[id^='bookQuantity${bookId}']`).html(cartItems[bookIndex].quantity);
            $(`a[id^='bookPrice${bookId}']`).html(cartItems[bookIndex].totalPrice + ' ₽');

            let currentOrderCount = parseInt($("#totalOrderCount").attr('data-order-count'));
            currentOrderCount -= 1;

            $("#totalOrderCount").attr('data-order-count', currentOrderCount);
            $("#totalOrderCount").html(currentOrderCount);

            let currentOrderSum = parseInt($("#totalOrderSum").attr('data-order-sum'));
            currentOrderSum -= bookPrice;

            $("#totalOrderSum").attr('data-order-sum', currentOrderSum);
            $("#totalOrderSum").html(`${currentOrderSum} ₽`);

            $("#totalOrderWithoutDeliverySum").attr('data-order-sum', currentOrderSum);
            $("#totalOrderWithoutDeliverySum").html(`${currentOrderSum} ₽`);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });

    $(document).on("click", "button[id^='cartRemoveBtn']", (event) => {
        let bookId = event.currentTarget.attributes['bookId'].value;

        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        let bookIndex = -1

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].bookId == bookId) {
                bookIndex = i;
                break;
            }
        }

        let totalPrice = cartItems[bookIndex].totalPrice;
        let quantity = cartItems[bookIndex].quantity;

        if (bookIndex !== -1)
            cartItems.splice(bookIndex, 1);

        $(`#cartItem${bookId}`).remove();

        let currentOrderCount = parseInt($("#totalOrderCount").attr('data-order-count'));
        currentOrderCount -= quantity;

        let currentOrderSum = parseInt($("#totalOrderSum").attr('data-order-sum'));
        currentOrderSum -= totalPrice;

        $("#totalOrderCount").attr('data-order-count', currentOrderCount);
        $("#totalOrderCount").html(currentOrderCount);

        if (currentOrderCount <= 0 && currentOrderSum <= 0) {
            $("#orderDiv").remove('');
            $("#cartDiv").html(`
                <div class="col-12 align-self-center d-flex flex-column align-items-center">
                    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="cart-empty__icon"><path fill="url(#cart-bag_svg__pattern0)" d="M0 0h160v160H0z"></path><defs><pattern id="cart-bag_svg__pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#cart-bag_svg__image0" transform="scale(.00407)"></use></pattern><image id="cart-bag_svg__image0" width="246" height="246" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2CAYAAADlEnrIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YzM3YjE2MC0wNTAyLWU0NDYtOGZjMC0wYWRhNmEwOTMwNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUJFMUY2QTQ1RDYxMTFFNTlEQTVGQjNEN0I1ODY5QUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJFMUY2QTM1RDYxMTFFNTlEQTVGQjNEN0I1ODY5QUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTYyZTQ0NzEtODdiZS0wNjQzLWJiYWItZTRmYTgzYWQ3YWIyIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZTUzMGViNTktZDg3MS0xMWU0LTk1YjMt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"></image></defs></svg>
                    <h3 class="text-center">Ваша корзина пока пуста!</h3>
                    <p class="text-center">Воспользуйтесь нашим <a href="/catalog" class="text-info" style="text-decoration:none;">каталогом</a>, чтобы её заполнить.</p>
                </div>
            `);
        }

        $("#totalOrderSum").attr('data-order-sum', currentOrderSum);
        $("#totalOrderSum").html(`${currentOrderSum} ₽`);

        $("#totalOrderWithoutDeliverySum").attr('data-order-sum', currentOrderSum);
        $("#totalOrderWithoutDeliverySum").html(`${currentOrderSum} ₽`);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $(document).on("click", "#submitOrderBtn", (event) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        let orderJson = [];

        for (let cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
            const cartItem = cartItems[cartItemIndex];

            orderJson.push({
                bookId: cartItem.bookId,
                quantity: cartItem.quantity,
                totalPrice: cartItem.totalPrice
            });
        }

        $.ajax({
            url: '/orders/add',
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({order: orderJson}),
            success: (response) => {
                if (response.success == 'created') {
                    $('#addedToCartModal').modal();

                    localStorage.removeItem('cartItems');
                    $("#cartDiv").html('');
                    $("#orderDiv").remove();
                }
                else if (response.success == 'unauthorized') {
                    $('#unauthorizedModal').modal();
                }
                else {
                    $('#errorModal').modal();
                }
                debugger
            },
            error: (error) => {

            }
        });
    });
});
